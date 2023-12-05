import { Module } from '@nestjs/common';
import { ParcelasOperacaoService } from './parcelas-operacao.service';
import { ParcelasOperacaoController } from './parcelas-operacao.controller';

@Module({
  controllers: [ParcelasOperacaoController],
  providers: [ParcelasOperacaoService],
})
export class ParcelasOperacaoModule {}
