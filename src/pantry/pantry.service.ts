import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PantryItem } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { normalizeKey } from './../common/normalize-key';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { UpdatePantryItemDto } from './dto/update-pantry-item.dto';

export interface PantrySuggestion {
  name: string;
  nameKey: string;
  // 'low_stock' = existing pantry item flagged low; 'frequent' = frequently
  // bought in past carts but not yet tracked in the pantry.
  reason: 'low_stock' | 'frequent';
  count?: number;
}

@Injectable()
export class PantryService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<PantryItem[]> {
    return this.prisma.pantryItem.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async create(userId: string, dto: CreatePantryItemDto): Promise<PantryItem> {
    const nameKey = normalizeKey(dto.name);
    return this.prisma.pantryItem.create({
      data: {
        userId,
        name: dto.name,
        nameKey,
        quantity: dto.quantity ?? null,
        unit: dto.unit ?? null,
      },
    });
  }

  private async findOwned(userId: string, id: string): Promise<PantryItem> {
    const item = await this.prisma.pantryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Item da despensa não encontrado');
    if (item.userId !== userId) throw new ForbiddenException('Acesso negado');
    return item;
  }

  async update(userId: string, id: string, dto: UpdatePantryItemDto): Promise<PantryItem> {
    await this.findOwned(userId, id);
    const nameKey = dto.name ? normalizeKey(dto.name) : undefined;
    return this.prisma.pantryItem.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name, nameKey } : {}),
        ...(dto.quantity !== undefined ? { quantity: dto.quantity } : {}),
        ...(dto.unit !== undefined ? { unit: dto.unit } : {}),
        ...(dto.lowStock !== undefined ? { lowStock: dto.lowStock } : {}),
      },
    });
  }

  async remove(userId: string, id: string): Promise<{ id: string }> {
    await this.findOwned(userId, id);
    await this.prisma.pantryItem.delete({ where: { id } });
    return { id };
  }

  // Heuristic: suggest (1) pantry items flagged lowStock, plus (2) the top
  // products by purchase frequency across the user's cart history that are not
  // already tracked in the pantry. Frequency = number of carts containing the
  // item (deduped per cart, by normalized name key).
  async suggestions(userId: string): Promise<PantrySuggestion[]> {
    const pantry = await this.prisma.pantryItem.findMany({ where: { userId } });
    const pantryKeys = new Set(pantry.map((p) => p.nameKey));

    const suggestions: PantrySuggestion[] = pantry
      .filter((p) => p.lowStock)
      .map((p) => ({ name: p.name, nameKey: p.nameKey, reason: 'low_stock' }));

    const carts = await this.prisma.carts.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const counts = new Map<string, { name: string; count: number }>();
    for (const cart of carts) {
      const seen = new Set<string>();
      for (const item of cart.items) {
        const key = normalizeKey(item.name);
        if (seen.has(key)) continue;
        seen.add(key);
        const entry = counts.get(key);
        if (entry) entry.count += 1;
        else counts.set(key, { name: item.name, count: 1 });
      }
    }

    const frequent = Array.from(counts.entries())
      // Bought in at least 2 carts and not already in the pantry.
      .filter(([key, v]) => v.count >= 2 && !pantryKeys.has(key))
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([key, v]) => ({
        name: v.name,
        nameKey: key,
        reason: 'frequent' as const,
        count: v.count,
      }));

    return [...suggestions, ...frequent];
  }
}
