import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';

@Module({
  imports: [PrismaModule],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
