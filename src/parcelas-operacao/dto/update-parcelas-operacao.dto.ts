import { PartialType } from '@nestjs/mapped-types';
import { CreateParcelasOperacaoDto } from './create-parcelas-operacao.dto';

export class UpdateParcelasOperacaoDto extends PartialType(CreateParcelasOperacaoDto) {}
