import { PartialType } from '@nestjs/mapped-types';
import { CreateDividaDto } from './create-divida.dto';

export class UpdateDividaDto extends PartialType(CreateDividaDto) {}
