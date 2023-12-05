import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTiposContratoDto } from './dto/create-tipos-contrato.dto';
import { UpdateTiposContratoDto } from './dto/update-tipos-contrato.dto';

@Injectable()
export class TiposContratoService {
  constructor(private prisma: PrismaService) {}

  create(license_id: number, createTiposContratoDto: CreateTiposContratoDto) {
    return this.prisma.tiposContrato.create({ data: { ...createTiposContratoDto, license_id } });
  }

  findAll(license_id: number) {
    return this.prisma.tiposContrato.findMany({ where: { license_id } });
  }

  findOne(id: number) {
    return this.prisma.tiposContrato.findUnique({ where: { id } });
  }

  update(id: number, updateTiposContratoDto: UpdateTiposContratoDto) {
    return this.prisma.tiposContrato.update({ where: { id }, data: updateTiposContratoDto });
  }

  remove(id: number) {
    return this.prisma.tiposContrato.delete({ where: { id } });
  }
}
