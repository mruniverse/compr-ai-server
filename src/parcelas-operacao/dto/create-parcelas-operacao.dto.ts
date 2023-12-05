import { IsDate, IsInt, IsOptional } from 'class-validator';
export class CreateParcelasOperacaoDto {
  @IsInt()
  status_id: number;

  @IsInt()
  numero_parcela: number;

  @IsOptional()
  @IsDate()
  ultima_atualizacao?: Date;

  @IsOptional()
  @IsDate()
  data_vencimento?: Date;

  @IsOptional()
  @IsDate()
  data_pagamento?: Date;
}
