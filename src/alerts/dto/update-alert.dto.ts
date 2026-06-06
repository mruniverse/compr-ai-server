import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateAlertDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  targetPrice?: number;

  @IsOptional()
  @IsIn(['drop', 'rise'])
  direction?: 'drop' | 'rise';

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
