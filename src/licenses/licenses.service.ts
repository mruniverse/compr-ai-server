import { PersonsService } from './../persons/persons.service';
import { Licenses, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService, private persons: PersonsService) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<Licenses> {
    const responsible = await this.persons.findOne(createLicenseDto.responsible_id);
    if (!responsible) throw new NotFoundException('Responsible not found');

    return this.prisma.licenses.create({ data: createLicenseDto });
  }

  findAll() {
    return this.prisma.licenses.findMany();
  }

  async findOne(licensesWhereUniqueInput: Prisma.LicensesWhereUniqueInput): Promise<Licenses | null> {
    return this.prisma.licenses.findUnique({ where: licensesWhereUniqueInput });
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    console.log(updateLicenseDto);
    return `This action updates a #${id} license`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
