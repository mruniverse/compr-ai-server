import { IsNotEmpty } from 'class-validator';

export class CreateRamoDto {
  @IsNotEmpty()
  name: string;
}
