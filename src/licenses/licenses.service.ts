import { PersonsService } from './../persons/persons.service';
import { Licenses, Prisma, Users } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService, private persons: PersonsService) {}

  async findWhereAllowed(loggedUser: Users): Promise<Prisma.LicensesWhereInput> {
    if (!loggedUser.license_id) throw new Error('Usuário sem credenciais');

    const where: Prisma.LicensesWhereInput = {
      id: {
        equals: loggedUser.license_id,
      },
    };

    return where;
  }

  async create(createLicenseDto: CreateLicenseDto): Promise<Licenses> {
    const responsible = await this.persons.findOne(createLicenseDto.responsible_id);
    if (!responsible) throw new NotFoundException('Responsável não encontrado');

    const hasLicense = await this.prisma.licenses.findFirst({
      where: {
        responsible_id: createLicenseDto.responsible_id,
      },
    });
    if (hasLicense) throw new NotFoundException('O responsável já possui uma licença');

    return this.prisma.licenses.create({ data: createLicenseDto });
  }

  findAll(where: Prisma.LicensesWhereInput): Promise<Licenses[]> {
    return this.prisma.licenses.findMany({
      where,
      include: {
        Person: {
          select: {
            name: true,
            cpf_cnpj: true,
          },
        },
        Users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findOne(licensesWhereUniqueInput: Prisma.LicensesWhereUniqueInput) {
    return this.prisma.licenses.findUnique({
      where: licensesWhereUniqueInput,
      include: {
        Users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return this.prisma.licenses.update({ where: { id }, data: updateLicenseDto });
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}
