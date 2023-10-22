import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateStatusFaseDividaDto } from './dto/create-status-fase-divida.dto';
import { UpdateStatusFaseDividaDto } from './dto/update-status-fase-divida.dto';

@Injectable()
export class StatusFaseDividasService {
  constructor(private prisma: PrismaService) {}

  create(createStatusFaseDividaDto: CreateStatusFaseDividaDto) {
    return this.prisma.statusFaseDividas.create({ data: createStatusFaseDividaDto });
  }

  findAll() {
    return this.prisma.statusFaseDividas.findMany();
  }

  findOne(id: number) {
    return this.prisma.statusFaseDividas.findUnique({ where: { id } });
  }

  update(id: number, updateStatusFaseDividaDto: UpdateStatusFaseDividaDto) {
    return this.prisma.statusFaseDividas.update({ where: { id }, data: updateStatusFaseDividaDto });
  }

  remove(id: number) {
    return this.prisma.statusFaseDividas.delete({ where: { id } });
  }
}
