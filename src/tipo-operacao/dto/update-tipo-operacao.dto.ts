import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoOperacaoDto } from './create-tipo-operacao.dto';

export class UpdateTipoOperacaoDto extends PartialType(CreateTipoOperacaoDto) {}
