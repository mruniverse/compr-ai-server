import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @IsEmail()
  email: string;

  password: string;

  license_id: number;

  active: boolean;
  avatar: string;
  role_id: number;
}
