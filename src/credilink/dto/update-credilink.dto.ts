import { PartialType } from '@nestjs/mapped-types';
import { CreateCredilinkDto } from './create-credilink.dto';

export class UpdateCredilinkDto extends PartialType(CreateCredilinkDto) {}
