import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePantryItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unit?: string;
}
