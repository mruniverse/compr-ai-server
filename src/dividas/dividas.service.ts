import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DividasService {
  constructor(private prisma: PrismaService) {}

  private remapDivida(divida: CreateDividaDto) {
    let newDivida: Prisma.DividasCreateInput;

    Object.keys(divida).forEach((key) => {
      switch (key) {
        case 'id':
          break;
        case 'tipo_garantia_id':
          newDivida = {
            ...newDivida,
            TipoGarantia: {
              connect: {
                id: divida.tipo_garantia_id,
              },
            },
          };
          break;
        case 'credor_id':
          newDivida = {
            ...newDivida,
            Credor: {
              connect: {
                id: divida.credor_id,
              },
            },
          };
          break;
        case 'devedor_id':
          newDivida = {
            ...newDivida,
            Devedor: {
              connect: {
                id: divida.devedor_id,
              },
            },
          };
          break;
        default:
          newDivida = {
            ...newDivida,
            [key]: divida[key],
          };
      }
    });

    return newDivida;
  }

  create(createDividaDto: CreateDividaDto) {
    const newDivida = this.remapDivida(createDividaDto);
    return this.prisma.dividas.create({
      data: {
        ...newDivida,
      },
    });
  }

  findAll() {
    return this.prisma.dividas.findMany({
      include: {
        Devedor: {
          select: {
            name: true,
          },
        },
        TipoGarantia: {
          select: {
            name: true,
          },
        },
      },
    });
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
