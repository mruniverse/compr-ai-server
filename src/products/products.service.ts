import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { normalizeKey } from './../common/normalize-key';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async search(search?: string, limit = 8): Promise<Products[]> {
    return this.prisma.products.findMany({
      where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
      orderBy: { name: 'asc' },
      take: Math.min(limit, 50),
    });
  }

  async findOne(id: string): Promise<Products | null> {
    return this.prisma.products.findUnique({ where: { id } });
  }

  async findByBarcode(barcode: string): Promise<Products | null> {
    return this.prisma.products.findFirst({ where: { barcode } });
  }

  // Upsert by normalized name key so re-adding a product updates price/unit
  // instead of creating a duplicate catalog row.
  async upsert(dto: CreateProductDto): Promise<Products> {
    const nameKey = normalizeKey(dto.name);

    return this.prisma.products.upsert({
      where: { nameKey },
      update: { price: dto.price, unit: dto.unit },
      create: {
        name: dto.name,
        nameKey,
        price: dto.price,
        unit: dto.unit,
      },
    });
  }
}
