import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Carts, ShoppingList } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { CartsService } from './../carts/carts.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListItemDto } from './dto/list-item.dto';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService, private carts: CartsService) {}

  async findAllByUser(userId: string): Promise<ShoppingList[]> {
    return this.prisma.shoppingList.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateListDto): Promise<ShoppingList> {
    return this.prisma.shoppingList.create({
      data: {
        userId,
        name: dto.name,
        icon: dto.icon ?? null,
        recurring: dto.recurring ?? false,
        items: [],
      },
    });
  }

  private async findOwned(userId: string, id: string): Promise<ShoppingList> {
    const list = await this.prisma.shoppingList.findUnique({ where: { id } });
    if (!list) throw new NotFoundException('Lista não encontrada');
    if (list.userId !== userId) throw new ForbiddenException('Acesso negado');
    return list;
  }

  async findOne(userId: string, id: string): Promise<ShoppingList> {
    return this.findOwned(userId, id);
  }

  async update(userId: string, id: string, dto: UpdateListDto): Promise<ShoppingList> {
    await this.findOwned(userId, id);
    return this.prisma.shoppingList.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.icon !== undefined ? { icon: dto.icon } : {}),
        ...(dto.recurring !== undefined ? { recurring: dto.recurring } : {}),
        ...(dto.archived !== undefined ? { archived: dto.archived } : {}),
        ...(dto.items !== undefined ? { items: { set: this.toListItems(dto.items) } } : {}),
      },
    });
  }

  async remove(userId: string, id: string): Promise<{ id: string }> {
    await this.findOwned(userId, id);
    await this.prisma.shoppingList.delete({ where: { id } });
    return { id };
  }

  // Turn the list into a closed Cart (reusing CartsService so price recording +
  // alert evaluation run identically to a normal save). Only checked items are
  // purchased; if nothing is checked, the whole list is treated as purchased.
  // After finishing: recurring lists keep their items (reset checked=false) so
  // they can be reused; one-off lists are archived.
  async finish(userId: string, id: string): Promise<{ cart: Carts; list: ShoppingList }> {
    const list = await this.findOwned(userId, id);

    const anyChecked = list.items.some((i) => i.checked);
    const purchased = anyChecked ? list.items.filter((i) => i.checked) : list.items;

    if (purchased.length === 0) {
      throw new BadRequestException('A lista não possui itens para finalizar');
    }

    const cart = await this.carts.create(
      userId,
      purchased.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    );

    const updated = list.recurring
      ? await this.prisma.shoppingList.update({
          where: { id },
          data: {
            items: {
              set: list.items.map((i) => ({ ...i, checked: false })),
            },
          },
        })
      : await this.prisma.shoppingList.update({
          where: { id },
          data: { archived: true },
        });

    return { cart, list: updated };
  }

  private toListItems(items: ListItemDto[]) {
    return items.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      checked: i.checked ?? false,
      productId: i.productId ?? null,
      nameKey: i.nameKey ?? null,
    }));
  }
}
