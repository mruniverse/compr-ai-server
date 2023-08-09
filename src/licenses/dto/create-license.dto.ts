import { IsNotEmpty } from 'class-validator';

export class CreateLicenseDto {
  @IsNotEmpty()
  max_users: number;

  @IsNotEmpty()
  responsible_id: number;
}
