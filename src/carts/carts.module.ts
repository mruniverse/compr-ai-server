import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { PricesModule } from './../prices/prices.module';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';

@Module({
  imports: [PrismaModule, PricesModule],
  providers: [CartsService],
  controllers: [CartsController],
  exports: [CartsService],
})
export class CartsModule {}
