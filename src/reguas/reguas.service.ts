import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateReguaDto } from './dto/create-regua.dto';
import { UpdateReguaDto } from './dto/update-regua.dto';

@Injectable()
export class ReguaService {
  constructor(private prisma: PrismaService) {}

  create(createReguaDto: CreateReguaDto, license_id: number) {
    return this.prisma.reguas.create({
      data: {
        ...createReguaDto,
        license_id,
      },
    });
  }

  findAll(license_id: number, include?: Prisma.ReguasInclude) {
    return this.prisma.reguas.findMany({ include, where: { license_id } });
  }

  findActive(license_id: number) {
    return this.prisma.reguas.findFirst({ where: { AND: [{ active: true, license_id }] } });
  }

  findOne(id: number) {
    return this.prisma.reguas.findUnique({ where: { id } });
  }

  update(id: number, updateReguaDto: UpdateReguaDto) {
    return this.prisma.reguas.update({ where: { id }, data: updateReguaDto });
  }

  remove(id: number) {
    return this.prisma.reguas.delete({ where: { id } });
  }
}
