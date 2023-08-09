import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  license_id: number;

  @IsOptional()
  @IsArray()
  permissions_id: number[];

  active: boolean;
  avatar: string;
  role_id: number;
}
