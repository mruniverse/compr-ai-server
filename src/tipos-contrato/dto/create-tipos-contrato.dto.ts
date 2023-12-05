import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTiposContratoDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsNumber()
  desconto_max: number;

  created_at: Date;
  updated_at: Date;
}
