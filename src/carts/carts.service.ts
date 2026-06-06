import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Carts } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { PricesService } from './../prices/prices.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);

  constructor(private prisma: PrismaService, private prices: PricesService) {}

  async create(userId: string, items: CreateCartItemDto[]): Promise<Carts> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cart = await this.prisma.carts.create({
      data: {
        userId,
        closed: true,
        total,
        items: { set: items },
      },
    });

    // Record a price point per item. A recording failure must NOT fail the save.
    try {
      await this.prices.recordFromCart(userId, cart.id, items);
    } catch (error) {
      this.logger.error(
        `Falha ao registrar histórico de preços do carrinho ${cart.id}`,
        error instanceof Error ? error.stack : String(error),
      );
    }

    return cart;
  }

  async findAllByUser(userId: string): Promise<Carts[]> {
    return this.prisma.carts.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async findOwned(userId: string, id: string): Promise<Carts> {
    const cart = await this.prisma.carts.findUnique({ where: { id } });
    if (!cart) throw new NotFoundException('Compra não encontrada');
    if (cart.userId !== userId) throw new ForbiddenException('Acesso negado');
    return cart;
  }

  async reopen(userId: string, id: string): Promise<Carts> {
    await this.findOwned(userId, id);
    return this.prisma.carts.update({
      where: { id },
      data: { closed: false },
    });
  }

  async update(userId: string, id: string, items: CreateCartItemDto[]): Promise<Carts> {
    await this.findOwned(userId, id);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return this.prisma.carts.update({
      where: { id },
      data: { total, items: { set: items } },
    });
  }
}
