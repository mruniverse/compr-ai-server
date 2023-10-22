import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FasesReguaService } from './fases-regua.service';
import { FasesReguaController } from './fases-regua.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FasesReguaController],
  providers: [FasesReguaService],
  exports: [FasesReguaService],
})
export class FasesReguaModule {}
