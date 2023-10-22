import { IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateIndexDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  nome: string;

  @IsNumber()
  valor: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}
