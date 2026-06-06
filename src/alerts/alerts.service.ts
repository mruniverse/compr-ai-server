import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PriceAlert } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { normalizeKey } from './../common/normalize-key';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

// Alert enriched with the product's latest known price and whether it is
// currently triggered (lastTriggeredAt set).
export interface AlertView extends PriceAlert {
  currentPrice: number | null;
  triggered: boolean;
}

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string): Promise<AlertView[]> {
    const alerts = await this.prisma.priceAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Resolve current price per alert from the product catalog (by nameKey).
    const keys = Array.from(new Set(alerts.map((a) => a.nameKey)));
    const products = await this.prisma.products.findMany({
      where: { nameKey: { in: keys } },
    });
    const priceByKey = new Map<string, number | null>(products.map((p) => [p.nameKey ?? '', p.lastPrice ?? p.price]));

    return alerts.map((alert) => ({
      ...alert,
      currentPrice: priceByKey.get(alert.nameKey) ?? null,
      triggered: alert.lastTriggeredAt != null,
    }));
  }

  async create(userId: string, dto: CreateAlertDto): Promise<PriceAlert> {
    const nameKey = normalizeKey(dto.name);
    return this.prisma.priceAlert.create({
      data: {
        userId,
        name: dto.name,
        nameKey,
        productId: dto.productId ?? null,
        targetPrice: dto.targetPrice ?? null,
        direction: dto.direction ?? 'drop',
      },
    });
  }

  private async findOwned(userId: string, id: string): Promise<PriceAlert> {
    const alert = await this.prisma.priceAlert.findUnique({ where: { id } });
    if (!alert) throw new NotFoundException('Alerta não encontrado');
    if (alert.userId !== userId) throw new ForbiddenException('Acesso negado');
    return alert;
  }

  async update(userId: string, id: string, dto: UpdateAlertDto): Promise<PriceAlert> {
    await this.findOwned(userId, id);
    const nameKey = dto.name ? normalizeKey(dto.name) : undefined;
    return this.prisma.priceAlert.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name, nameKey } : {}),
        ...(dto.productId !== undefined ? { productId: dto.productId } : {}),
        ...(dto.targetPrice !== undefined ? { targetPrice: dto.targetPrice } : {}),
        ...(dto.direction !== undefined ? { direction: dto.direction } : {}),
        ...(dto.active !== undefined ? { active: dto.active } : {}),
      },
    });
  }

  async remove(userId: string, id: string): Promise<{ id: string }> {
    await this.findOwned(userId, id);
    await this.prisma.priceAlert.delete({ where: { id } });
    return { id };
  }
}
