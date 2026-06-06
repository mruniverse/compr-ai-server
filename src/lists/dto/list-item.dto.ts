import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsBoolean()
  checked?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nameKey?: string;
}
