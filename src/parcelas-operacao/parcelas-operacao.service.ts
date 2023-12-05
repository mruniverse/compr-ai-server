import { Injectable } from '@nestjs/common';
import { CreateParcelasOperacaoDto } from './dto/create-parcelas-operacao.dto';
import { UpdateParcelasOperacaoDto } from './dto/update-parcelas-operacao.dto';

@Injectable()
export class ParcelasOperacaoService {
  create(createParcelasOperacaoDto: CreateParcelasOperacaoDto) {
    return 'This action adds a new parcelasOperacao';
  }

  findAll() {
    return `This action returns all parcelasOperacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parcelasOperacao`;
  }

  update(id: number, updateParcelasOperacaoDto: UpdateParcelasOperacaoDto) {
    return `This action updates a #${id} parcelasOperacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} parcelasOperacao`;
  }
}
