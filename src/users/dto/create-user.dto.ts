import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  password: string;
  license_id: number;
  active: boolean;
  avatar: string;
  role_id: number;
}
