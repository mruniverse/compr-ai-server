import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  recurring?: boolean;
}
