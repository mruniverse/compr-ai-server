import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFasesReguaDto } from './dto/create-fases-regua.dto';
import { UpdateFasesReguaDto } from './dto/update-fases-regua.dto';

@Injectable()
export class FasesReguaService {
  constructor(private prisma: PrismaService) {}

  async create(createFasesReguaDto: CreateFasesReguaDto) {
    const dividas = await this.prisma.dividas.findMany();

    return this.prisma.fasesRegua.create({
      data: {
        ...createFasesReguaDto,
        StatusFaseDividas: {
          createMany: {
            data: dividas.map((divida) => ({
              divida_id: divida.id,
              active: createFasesReguaDto.active,
            })),
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.fasesRegua.findMany();
  }

  findAllFromRegua(id: number) {
    return this.prisma.fasesRegua.findMany({
      where: {
        regua_id: id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.fasesRegua.findUnique({ where: { id } });
  }

  update(id: number, updateFasesReguaDto: UpdateFasesReguaDto) {
    return this.prisma.fasesRegua.update({ where: { id }, data: updateFasesReguaDto });
  }

  remove(id: number) {
    return this.prisma.fasesRegua.delete({ where: { id } });
  }
}
