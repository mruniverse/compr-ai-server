import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';

@Injectable()
export class DividasService {
  constructor(private prisma: PrismaService) {}

  create(createDividaDto: CreateDividaDto) {
    return this.prisma.dividas.create({
      data: {
        ...createDividaDto,
      },
    });
  }

  findAll() {
    return this.prisma.dividas.findMany();
  }

  findOne(id: number) {
    return this.prisma.dividas.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDividaDto: UpdateDividaDto) {
    return this.prisma.dividas.update({
      where: { id },
      data: {
        ...updateDividaDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dividas.delete({
      where: { id },
    });
  }
}
