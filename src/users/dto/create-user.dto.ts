import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  license_id: number;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsNumber()
  role_id: number;
}
