import EnderecosDto from 'src/enderecos/dto/create-endereco.dto';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsEmail,
  IsDateString,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

enum EstadoCivil {
  SOLTEIRO = 'solteiro',
  CASADO = 'casado',
  DIVORCIADO = 'divorciado',
  VIUVO = 'viuvo',
}

enum RegimeDeBens {
  COMUNHAO_TOTAL = 'comunhao_total',
  COMUNHAO_PARCIAL = 'comunhao_parcial',
  SEPARACAO_BENS = 'separacao_bens',
}

enum Sexo {
  MASCULINO = 'masculino',
  FEMININO = 'feminino',
}

export default class CreatePersonDto {
  @IsOptional()
  id: number;

  @IsInt()
  ramo_id: number;

  @IsString()
  name: string;

  @IsString()
  cpf_cnpj: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  ie?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(Sexo)
  sexo?: string;

  @IsOptional()
  @IsString()
  profissao?: string;

  @IsOptional()
  @IsDateString()
  nascimento?: Date;

  @IsOptional()
  @IsEnum(EstadoCivil)
  estado_civil?: string;

  @IsOptional()
  @IsEnum(RegimeDeBens)
  regime_de_bens?: string;

  @IsOptional()
  @IsDateString()
  casamento?: Date;

  @IsOptional()
  @IsString()
  razao_social?: string;

  @IsOptional()
  @IsDateString()
  constituicao?: Date;

  @IsOptional()
  @IsNumber()
  renda_mensal?: number;

  @IsOptional()
  @IsNumber()
  comprometimento_renda_mensal?: number;

  @IsOptional()
  @IsNumber()
  valor_patrimonio?: number;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnderecosDto)
  enderecos: EnderecosDto[];
}
