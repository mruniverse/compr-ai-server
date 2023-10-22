import { IsBoolean, IsNumber } from 'class-validator';
export class CreateStatusFaseDividaDto {
  @IsNumber()
  divida_id: number;

  @IsNumber()
  fase_id: number;

  @IsBoolean()
  active: boolean;
}
