import { IsOptional, IsInt, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateDividaDto {
  @IsOptional()
  id: number;

  @IsInt()
  credor_id: number;

  @IsInt()
  devedor_id: number;

  @IsInt({ each: true })
  indices_ids: number[];

  @IsOptional()
  @IsInt()
  tipo_garantia_id?: number;

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
  @IsDateString()
  data_vencimento: Date;

  @IsOptional()
  @IsDateString()
  data_contratacao?: Date;

  @IsOptional()
  @IsDateString()
  data_pagamento?: Date;

  @IsOptional()
  @IsDateString()
  data_prescricao?: Date;

  @IsOptional()
  @IsDateString()
  data_constituicao_mora?: Date;

  @IsOptional()
  documento_contratual?: Blob;

  @IsOptional()
  TiposOperacoes?: any;
}
