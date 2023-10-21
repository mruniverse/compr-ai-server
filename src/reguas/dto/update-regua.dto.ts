import { PartialType } from '@nestjs/mapped-types';
import { CreateReguaDto } from './create-regua.dto';

export class UpdateReguaDto extends PartialType(CreateReguaDto) {}
