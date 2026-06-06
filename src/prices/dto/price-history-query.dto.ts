import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PriceHistoryQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}
