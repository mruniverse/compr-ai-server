import { Type } from 'class-transformer';
import { CreateParcelasOperacaoDto } from './../../parcelas-operacao/dto/create-parcelas-operacao.dto';
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
  // @ValidateNested({ each: true })
  // @Type(() => CreateChequeDto)
  cheque: CreateChequeDto[];

  @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => CreateDuplicataDto)
  duplicata: CreateDuplicataDto[];
}

export class CreateChequeDto {
  @IsString()
  emitente_cheque_id: string;

  @IsString()
  beneficiario_id: string;

  @IsOptional()
  @IsNumber()
  parcela_id: number;

  @IsOptional()
  @IsNumber()
  valor_cheque: number;

  @IsOptional()
  @IsDateString()
  data_emissao: Date;

  @IsOptional()
  @IsDateString()
  data_vencimento: Date;

  @IsOptional()
  @IsString()
  informacoes_conta: string;

  @IsOptional()
  @IsNumber()
  operacao_alinea_devolucao: number;

  @IsOptional()
  @IsNumber()
  numero_cheque: number;

  @IsOptional()
  @IsNumber()
  banco: number;

  @IsOptional()
  @IsNumber()
  agencia: number;

  @IsOptional()
  @IsNumber()
  conta: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateParcelasOperacaoDto)
  ParcelasOperacao: CreateParcelasOperacaoDto;
}

export class CreateDuplicataDto {
  @IsNumber()
  emitente_duplicata_id: number;

  @IsNumber()
  sacado_id: number;

  @IsOptional()
  @IsNumber()
  parcela_id: number;

  @IsOptional()
  @IsNumber()
  valor_duplicata: number;

  @IsOptional()
  @IsDateString()
  data_emissao: Date;

  @IsOptional()
  @IsDateString()
  data_vencimento: Date;

  @IsOptional()
  @IsString()
  detalhes_itens_servicos: string;
}
