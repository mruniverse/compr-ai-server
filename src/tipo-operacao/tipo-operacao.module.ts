import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TipoOperacaoService } from './tipo-operacao.service';
import { TipoOperacaoController } from './tipo-operacao.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TipoOperacaoController],
  providers: [TipoOperacaoService],
  exports: [TipoOperacaoService],
})
export class TipoOperacaoModule {}
