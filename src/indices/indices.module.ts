import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { IndicesService } from './indices.service';
import { IndicesController } from './indices.controller';

@Module({
  imports: [PrismaModule],
  controllers: [IndicesController],
  providers: [IndicesService],
})
export class IndicesModule {}
