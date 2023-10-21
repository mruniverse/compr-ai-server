import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateReguaDto {
  @IsString()
  @IsOptional()
  tipo_regua: string;

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
