import { Injectable } from '@nestjs/common';
import { Carts } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, items: CreateCartItemDto[]): Promise<Carts> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return this.prisma.carts.create({
      data: {
        userId,
        closed: true,
        total,
        items: { set: items },
      },
    });
  }

  async findAllByUser(userId: string): Promise<Carts[]> {
    return this.prisma.carts.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
