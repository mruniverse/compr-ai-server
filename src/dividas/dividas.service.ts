import { Injectable } from '@nestjs/common';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';

@Injectable()
export class DividasService {
  create(createDividaDto: CreateDividaDto) {
    return 'This action adds a new divida';
  }

  findAll() {
    return `This action returns all dividas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} divida`;
  }

  update(id: number, updateDividaDto: UpdateDividaDto) {
    return `This action updates a #${id} divida`;
  }

  remove(id: number) {
    return `This action removes a #${id} divida`;
  }
}
