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

  findAll() {
    return this.prisma.reguas.findMany();
  }

  findActive() {
    return this.prisma.reguas.findFirst({ where: { active: true } });
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
