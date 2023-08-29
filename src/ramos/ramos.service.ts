import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRamoDto } from './dto/create-ramo.dto';
import { UpdateRamoDto } from './dto/update-ramo.dto';

@Injectable()
export class RamosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRamoDto: CreateRamoDto) {
    return this.prisma.ramos.create({
      data: {
        ...createRamoDto,
      },
    });
  }

  findAll() {
    return this.prisma.ramos.findMany();
  }

  findOne(id: number) {
    return this.prisma.ramos.findUnique({
      where: { id },
    });
  }

  update(id: number, updateRamoDto: UpdateRamoDto) {
    return this.prisma.ramos.update({
      where: { id },
      data: {
        ...updateRamoDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.ramos.delete({
      where: { id },
    });
  }
}
