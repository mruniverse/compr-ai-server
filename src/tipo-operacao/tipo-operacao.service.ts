import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTipoOperacaoDto, CreateChequeDto, CreateDuplicataDto } from './dto/create-tipo-operacao.dto';
import { UpdateTipoOperacaoDto } from './dto/update-tipo-operacao.dto';

@Injectable()
export class TipoOperacaoService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTipoOperacaoDto: CreateTipoOperacaoDto) {
    const tipoOperacao = this.getTipoOperacaoConnections(createTipoOperacaoDto);

    return this.prisma.tiposOperacoes.create({ data: tipoOperacao });
  }

  findAll() {
    return `This action returns all tipoOperacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoOperacao`;
  }

  update(id: number, updateTipoOperacaoDto: UpdateTipoOperacaoDto) {
    return `This action updates a #${id} tipoOperacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoOperacao`;
  }

  private getTipoOperacaoConnections(createTipoOperacaoDto: CreateTipoOperacaoDto) {
    let tipoOperacao: Prisma.TiposOperacoesCreateInput = {
      Divida: {
        connect: {
          id: createTipoOperacaoDto.divida_id,
        },
      },
    };

    if (createTipoOperacaoDto.cheque) {
      const cheque: Prisma.ChequeCreateInput[] = [];
      createTipoOperacaoDto.cheque.forEach((chequeDto: CreateChequeDto) => {
        const emitente_cheque_id = chequeDto.emitente_cheque_id;
        const beneficiario_id = chequeDto.beneficiario_id;
        const parcela_id = chequeDto.parcela_id;

        delete chequeDto.emitente_cheque_id;
        delete chequeDto.beneficiario_id;
        delete chequeDto.parcela_id;

        cheque.push({
          ...chequeDto,
          EmitenteCheque: {
            connect: {
              id: emitente_cheque_id,
            },
          },
          BeneficiarioCheque: {
            connect: {
              id: beneficiario_id,
            },
          },
          ParcelasOperacao: {
            connect: {
              id: parcela_id,
            },
          },
        });
      });

      tipoOperacao = {
        ...tipoOperacao,
        Cheque: {
          create: cheque,
        },
      };
    }

    if (createTipoOperacaoDto.duplicata) {
      const duplicata: Prisma.DuplicataCreateInput[] = [];
      createTipoOperacaoDto.duplicata.forEach((duplicataDto: CreateDuplicataDto) => {
        const emitente_duplicata_id = duplicataDto.emitente_duplicata_id;
        const sacado_id = duplicataDto.sacado_id;
        const parcela_id = duplicataDto.parcela_id;

        delete duplicataDto.emitente_duplicata_id;
        delete duplicataDto.sacado_id;
        delete duplicataDto.parcela_id;

        duplicata.push({
          ...duplicataDto,
          EmitenteDuplicata: {
            connect: {
              id: emitente_duplicata_id,
            },
          },
          Sacado: {
            connect: {
              id: sacado_id,
            },
          },
          ParcelasOperacao: {
            connect: {
              id: parcela_id,
            },
          },
        });
      });

      tipoOperacao = {
        ...tipoOperacao,
        Duplicata: {
          create: duplicata,
        },
      };
    }

    return tipoOperacao;
  }
}
