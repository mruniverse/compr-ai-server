import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateAlertDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  targetPrice?: number;

  @IsOptional()
  @IsIn(['drop', 'rise'])
  direction?: 'drop' | 'rise';
}
