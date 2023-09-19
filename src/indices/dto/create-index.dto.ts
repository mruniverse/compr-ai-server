import { IsNumber, IsString, IsOptional, IsNumberString } from 'class-validator';
export class CreateIndexDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  nome: string;

  @IsNumberString()
  valor: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}
