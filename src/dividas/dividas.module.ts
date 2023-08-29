import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { DividasService } from './dividas.service';
import { DividasController } from './dividas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DividasController],
  providers: [DividasService],
})
export class DividasModule {}
