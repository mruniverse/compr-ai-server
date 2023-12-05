import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRamoDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  name: string;
}
