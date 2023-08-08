import { PartialType } from '@nestjs/mapped-types';
import { CreateLicencaDto } from './create-licenca.dto';

export class UpdateLicencaDto extends PartialType(CreateLicencaDto) {}
