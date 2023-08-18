import { PartialType } from '@nestjs/mapped-types';
import { CreateLicenseDto } from './create-license.dto';
import { IsNumber } from 'class-validator';

export class UpdateLicenseDto extends PartialType(CreateLicenseDto) {
  @IsNumber()
  max_users?: number;

  @IsNumber()
  responsible_id?: number;
}
