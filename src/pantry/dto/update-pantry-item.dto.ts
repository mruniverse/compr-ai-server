import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePantryItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unit?: string;

  @IsOptional()
  @IsBoolean()
  lowStock?: boolean;
}
