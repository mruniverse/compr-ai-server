import { Licencas, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLicencaDto } from './dto/create-licenca.dto';
import { UpdateLicencaDto } from './dto/update-licenca.dto';

@Injectable()
export class LicencasService {
  constructor(private prisma: PrismaService) {}

  create(createLicencaDto: CreateLicencaDto): Promise<Licencas> {
    return this.prisma.licencas.create({ data: createLicencaDto });
  }

  findAll() {
    return `This action returns all licencas`;
  }

  async findOne(
    licencasWhereUniqueInput: Prisma.LicencasWhereUniqueInput,
  ): Promise<Licencas | null> {
    return this.prisma.licencas.findUnique({ where: licencasWhereUniqueInput });
  }

  update(id: number, updateLicencaDto: UpdateLicencaDto) {
    console.log(updateLicencaDto);
    return `This action updates a #${id} licenca`;
  }

  remove(id: number) {
    return `This action removes a #${id} licenca`;
  }
}
