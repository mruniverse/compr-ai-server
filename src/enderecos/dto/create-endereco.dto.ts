import { IsOptional, IsString, IsInt } from 'class-validator';

export default class EnderecosDto {
  @IsOptional()
  id: number;

  @IsString()
  cep: string;

  @IsInt()
  @IsOptional()
  person_id: number;

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  numero?: string;
}
