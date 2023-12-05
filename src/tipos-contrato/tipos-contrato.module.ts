import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TiposContratoService } from './tipos-contrato.service';
import { TiposContratoController } from './tipos-contrato.controller';

@Module({
  imports: [PrismaModule],
  providers: [TiposContratoService],
  controllers: [TiposContratoController],
})
export class TiposContratoModule {}
