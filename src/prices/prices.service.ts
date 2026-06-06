import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PricePoint } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { normalizeKey } from './../common/normalize-key';

interface CartItemInput {
  name: string;
  price: number;
  quantity: number;
}

export interface PriceHistoryPoint {
  price: number;
  quantity: number;
  recordedAt: Date;
  cartId: string | null;
}

export interface PriceHistory {
  name: string;
  productId: string | null;
  unit: string;
  points: PriceHistoryPoint[];
}

export interface PriceSummary {
  name: string;
  productId: string | null;
  unit: string;
  current: number | null;
  lowest: { price: number; recordedAt: Date } | null;
  highest: { price: number; recordedAt: Date } | null;
  average: number | null;
  count: number;
  firstRecordedAt: Date | null;
  lastRecordedAt: Date | null;
  trend: 'up' | 'down' | 'stable';
  changePct: number | null;
}

@Injectable()
export class PricesService {
  private readonly logger = new Logger(PricesService.name);

  constructor(private prisma: PrismaService) {}

  // Called after a cart is saved: upsert each item into the catalog and append
  // a price point. Caller wraps this in try/catch — must never throw fatally.
  async recordFromCart(userId: string, cartId: string, items: CartItemInput[]): Promise<void> {
    for (const item of items) {
      const nameKey = normalizeKey(item.name);
      const existing = await this.prisma.products.findUnique({
        where: { nameKey },
      });
      const lowest = existing?.lowestPrice != null ? Math.min(existing.lowestPrice, item.price) : item.price;
      const unit = existing?.unit ?? 'un';
      const now = new Date();

      const product = await this.prisma.products.upsert({
        where: { nameKey },
        update: {
          price: item.price,
          lastPrice: item.price,
          lowestPrice: lowest,
          lastRecordedAt: now,
        },
        create: {
          name: item.name,
          nameKey,
          price: item.price,
          unit,
          lastPrice: item.price,
          lowestPrice: item.price,
          lastRecordedAt: now,
        },
      });

      await this.prisma.pricePoint.create({
        data: {
          productId: product.id,
          name: item.name,
          nameKey,
          price: item.price,
          quantity: item.quantity,
          unit: product.unit,
          userId,
          cartId,
          recordedAt: now,
        },
      });

      // Mark matching alerts triggered. Must never fail the cart save.
      await this.evaluateAlerts(userId, nameKey, item.price, now);
    }
  }

  // For a freshly recorded price, set lastTriggeredAt on active alerts whose
  // target is met (direction 'drop' → recorded price <= targetPrice). Errors
  // are swallowed so alert handling never breaks the price/cart pipeline.
  private async evaluateAlerts(userId: string, nameKey: string, price: number, now: Date): Promise<void> {
    try {
      const alerts = await this.prisma.priceAlert.findMany({
        where: { userId, nameKey, active: true },
      });
      for (const alert of alerts) {
        if (alert.targetPrice == null) continue;
        const met = alert.direction === 'rise' ? price >= alert.targetPrice : price <= alert.targetPrice;
        // lastTriggeredAt reflects CURRENT state: set when the target is met,
        // cleared when it no longer is (so `triggered` isn't permanently sticky).
        if (met) {
          await this.prisma.priceAlert.update({
            where: { id: alert.id },
            data: { lastTriggeredAt: now },
          });
        } else if (alert.lastTriggeredAt != null) {
          await this.prisma.priceAlert.update({
            where: { id: alert.id },
            data: { lastTriggeredAt: null },
          });
        }
      }
    } catch (error) {
      this.logger.error(
        `Falha ao avaliar alertas de preço para ${nameKey}`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  private async getPoints(userId: string, nameKey: string, from?: string, to?: string): Promise<PricePoint[]> {
    const recordedAt =
      from || to
        ? {
            ...(from ? { gte: new Date(from) } : {}),
            ...(to ? { lte: new Date(to) } : {}),
          }
        : undefined;

    return this.prisma.pricePoint.findMany({
      where: { userId, nameKey, ...(recordedAt ? { recordedAt } : {}) },
      orderBy: { recordedAt: 'asc' },
    });
  }

  async getHistoryByName(userId: string, name: string, from?: string, to?: string): Promise<PriceHistory> {
    const nameKey = normalizeKey(name);
    const product = await this.prisma.products.findUnique({
      where: { nameKey },
    });
    const points = await this.getPoints(userId, nameKey, from, to);

    return {
      name: product?.name ?? name,
      productId: product?.id ?? null,
      unit: product?.unit ?? 'un',
      points: points.map((p) => ({
        price: p.price,
        quantity: p.quantity,
        recordedAt: p.recordedAt,
        cartId: p.cartId ?? null,
      })),
    };
  }

  async getHistoryByProductId(userId: string, productId: string): Promise<PriceHistory> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return this.getHistoryByName(userId, product.name);
  }

  async getSummary(userId: string, name: string, from?: string, to?: string): Promise<PriceSummary> {
    const history = await this.getHistoryByName(userId, name, from, to);
    const points = history.points;
    const count = points.length;

    if (count === 0) {
      return {
        name: history.name,
        productId: history.productId,
        unit: history.unit,
        current: null,
        lowest: null,
        highest: null,
        average: null,
        count: 0,
        firstRecordedAt: null,
        lastRecordedAt: null,
        trend: 'stable',
        changePct: null,
      };
    }

    let lowest = points[0];
    let highest = points[0];
    let sum = 0;
    for (const p of points) {
      if (p.price < lowest.price) lowest = p;
      if (p.price > highest.price) highest = p;
      sum += p.price;
    }

    const current = points[count - 1].price;
    const previous = count >= 2 ? points[count - 2].price : null;
    const changePct = previous != null && previous !== 0 ? ((current - previous) / previous) * 100 : null;
    const trend: 'up' | 'down' | 'stable' =
      changePct == null || Math.abs(changePct) < 1 ? 'stable' : changePct > 0 ? 'up' : 'down';

    return {
      name: history.name,
      productId: history.productId,
      unit: history.unit,
      current,
      lowest: { price: lowest.price, recordedAt: lowest.recordedAt },
      highest: { price: highest.price, recordedAt: highest.recordedAt },
      average: sum / count,
      count,
      firstRecordedAt: points[0].recordedAt,
      lastRecordedAt: points[count - 1].recordedAt,
      trend,
      changePct,
    };
  }
}
