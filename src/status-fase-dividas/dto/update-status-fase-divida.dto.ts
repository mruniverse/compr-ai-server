import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusFaseDividaDto } from './create-status-fase-divida.dto';

export class UpdateStatusFaseDividaDto extends PartialType(CreateStatusFaseDividaDto) {}
