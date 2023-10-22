import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { StatusFaseDividasService } from './status-fase-dividas.service';
import { StatusFaseDividasController } from './status-fase-dividas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [StatusFaseDividasController],
  providers: [StatusFaseDividasService],
})
export class StatusFaseDividasModule {}
