import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateTipoOperacaoDto {
  @IsNumber()
  divida_id: number;

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => Hipoteca)
  // hipoteca: Hipoteca[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => AlienacaoFiduciaria)
  // alienacaoFiduciaria: AlienacaoFiduciaria[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => Penhor)
  // penhor: Penhor[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => Aval)
  // aval: Aval[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => Fianca)
  // fianca: Fianca[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => SeguroGarantia)
  // seguroGarantia: SeguroGarantia[];

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => CartaDeCredito)
  // cartaDeCredito: CartaDeCredito[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateChequeDto)
  cheque: CreateChequeDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDuplicataDto)
  duplicata: CreateDuplicataDto[];
}

export class CreateChequeDto {
  @IsNumber()
  emitente_cheque_id: number;

  @IsNumber()
  beneficiario_id: number;

  @IsNumber()
  valor_cheque: number;

  @IsDateString()
  data_emissao: Date;

  @IsDateString()
  data_vencimento: Date;

  @IsString()
  informacoes_conta: string;
}

export class CreateDuplicataDto {
  @IsNumber()
  emitente_duplicata_id: number;

  @IsNumber()
  sacado_id: number;

  @IsNumber()
  valor_duplicata: number;

  @IsDateString()
  data_emissao: Date;

  @IsDateString()
  data_vencimento: Date;

  @IsString()
  detalhes_itens_servicos: string;
}
