import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposContratoDto } from './create-tipos-contrato.dto';

export class UpdateTiposContratoDto extends PartialType(CreateTiposContratoDto) {}
