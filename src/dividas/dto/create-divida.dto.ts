import { IsOptional, IsInt, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateDividaDto {
  @IsOptional()
  id: number;

  @IsInt()
  credor_id: number;

  @IsInt()
  devedor_id: number;

  @IsOptional()
  @IsInt()
  tipo_garantia?: number;

  @IsOptional()
  @IsInt()
  modo_constituicao_mora?: number;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsNumber()
  multa?: number;

  @IsOptional()
  @IsNumber()
  mora?: number;

  @IsOptional()
  @IsNumber()
  valor_total_inicial?: number;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsDate()
  data_contratacao?: Date;

  @IsOptional()
  @IsDate()
  data_pagamento?: Date;

  @IsOptional()
  @IsDate()
  data_prescricao?: Date;

  @IsOptional()
  @IsDate()
  data_constituicao_mora?: Date;
}
