import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RamosService } from './ramos.service';
import { RamosController } from './ramos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RamosController],
  providers: [RamosService],
})
export class RamosModule {}
