import { IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFasesReguaDto {
  @IsInt()
  regua_id: number;

  @IsString()
  fase: string;

  @IsString()
  cron: string;

  @IsOptional()
  @IsString()
  mensagem?: string;

  @IsInt()
  duracao: number;

  @IsInt()
  inicio: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
