import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { CartsModule } from './../carts/carts.module';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';

@Module({
  imports: [PrismaModule, CartsModule],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
