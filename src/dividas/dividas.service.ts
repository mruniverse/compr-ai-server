import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';
import { Indices, Prisma, Users } from '@prisma/client';

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

  private addConnectionsToDivida(divida: CreateDividaDto | UpdateDividaDto) {
    let newDivida: Prisma.DividasCreateInput | Prisma.DividasUpdateInput;

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
        case 'tipo_contrato_id':
          newDivida = {
            ...newDivida,
            TipoContrato: {
              connect: {
                id: divida.tipo_contrato_id,
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
    const newDivida = this.addConnectionsToDivida(createDividaDto) as Prisma.DividasCreateInput;
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

  async findAll(where: Prisma.DividasWhereInput = {}) {
    const dividas = await this.prisma.dividas.findMany({
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
        TiposOperacoes: {
          include: {
            Cheque: {
              include: {
                ParcelasOperacao: true,
              },
            },
            Duplicata: {
              include: {
                ParcelasOperacao: true,
              },
            },
          },
        },
        StatusFaseDividas: true,
        Indices: true,
        TipoContrato: true,
      },
    });

    return dividas.map((divida) => {
      const valor_corrigido = this.valorCorrigido(divida.valor_total_inicial, divida.data_vencimento, divida.Indices);
      const indices_ids = divida.Indices.map((indice) => indice.id);
      delete divida.Indices;
      return {
        ...divida,
        valor_corrigido,
        indices_ids,
      };
    });
  }

  private valorCorrigido(valor_total_inicial: number, vecimento: Date, indices: Indices[]) {
    if (!valor_total_inicial) return 0;

    const dataAtual = new Date();
    const dataVencimento = new Date(vecimento);

    const diffVenctoHojeEmDias = Math.ceil((dataAtual.getTime() - dataVencimento.getTime()) / (1000 * 3600 * 24));
    let valor_corrigido = valor_total_inicial;
    for (const indice of indices) {
      valor_corrigido += valor_total_inicial + (indice.valor / 30) * diffVenctoHojeEmDias;
    }

    return valor_corrigido;
  }

  findOne(id: number) {
    return this.prisma.dividas.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDividaDto: UpdateDividaDto) {
    const newDivida = this.addConnectionsToDivida(updateDividaDto) as Prisma.DividasUpdateInput;
    return this.prisma.dividas.update({
      where: { id },
      data: {
        ...newDivida,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dividas.delete({
      where: { id },
    });
  }
}
