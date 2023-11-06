import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';
import { Prisma, Users } from '@prisma/client';

@Injectable()
export class DividasService {
  constructor(private prisma: PrismaService) {}

  async findWhereAllowed(loggedUser: Users): Promise<Prisma.DividasWhereInput> {
    if (!loggedUser.license_id) throw new Error('Usuário sem credenciais');
    if (loggedUser.role_id === 1) return {};

    const where: Prisma.DividasWhereInput = {
      license_id: {
        equals: loggedUser.license_id,
      },
    };

    return where;
  }

  private remapDivida(divida: CreateDividaDto) {
    let newDivida: Prisma.DividasCreateInput;

    Object.keys(divida).forEach((key) => {
      switch (key) {
        case 'id':
          break;
        case 'indices_ids':
          newDivida = {
            ...newDivida,
            Indices: {
              connect: divida.indices_ids.map((id) => ({ id })),
            },
          };
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

  async create(createDividaDto: CreateDividaDto, license_id: number) {
    const newDivida = this.remapDivida(createDividaDto);
    const fasesReguas = await this.prisma.fasesRegua.findMany();

    return this.prisma.dividas.create({
      data: {
        ...newDivida,
        License: {
          connect: {
            id: license_id,
          },
        },
        StatusFaseDividas: {
          createMany: {
            data: fasesReguas.map((fase) => ({
              fase_id: fase.id,
              active: fase.active,
            })),
          },
        },
      },
    });
  }

  findAllByVencimento(inicial: Date, final: Date) {
    return this.prisma.dividas.findMany({
      where: {
        data_vencimento: {
          gte: inicial,
          lte: final,
        },
      },
    });
  }

  findAll(where: Prisma.DividasWhereInput = {}) {
    return this.prisma.dividas.findMany({
      where,
      include: {
        Credor: {
          include: {
            Enderecos: true,
          },
        },
        Devedor: {
          include: {
            Enderecos: true,
          },
        },
        TipoGarantia: {
          select: {
            name: true,
          },
        },
        StatusFaseDividas: true,
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
