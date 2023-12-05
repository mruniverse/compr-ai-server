import { TipoOperacaoModule } from './../tipo-operacao/tipo-operacao.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { DividasService } from './dividas.service';
import { DividasController } from './dividas.controller';

@Module({
  imports: [PrismaModule, TipoOperacaoModule],
  controllers: [DividasController],
  providers: [DividasService],
  exports: [DividasService],
})
export class DividasModule {}
