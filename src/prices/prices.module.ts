import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';

@Module({
  imports: [PrismaModule],
  providers: [PricesService],
  controllers: [PricesController],
  exports: [PricesService],
})
export class PricesModule {}
