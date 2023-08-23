import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  permissions?: any[];
}
