import { PartialType } from '@nestjs/mapped-types';
import { CreateFasesReguaDto } from './create-fases-regua.dto';

export class UpdateFasesReguaDto extends PartialType(CreateFasesReguaDto) {}
