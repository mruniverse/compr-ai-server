import { CreateFasesReguaDto } from './../fases-regua/dto/create-fases-regua.dto';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { PersonsService } from './../persons/persons.service';
import { Licenses, Prisma, Users } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { getEmailsFromString } from '../utils/emailUtils';

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService, private persons: PersonsService, private users: UsersService) {}

  async findWhereAllowed(loggedUser: Users): Promise<Prisma.LicensesWhereInput> {
    if (!loggedUser.license_id) throw new Error('Usuário sem credenciais');
    if (loggedUser.role_id === 1) return {};

    const where: Prisma.LicensesWhereInput = {
      id: {
        equals: loggedUser.license_id,
      },
    };

    return where;
  }

  async create(createLicenseDto: CreateLicenseDto): Promise<Users> {
    const responsible = await this.persons.findOne(createLicenseDto.responsible_id);
    if (!responsible) throw new NotFoundException('Responsável não encontrado');

    const hasLicense = await this.prisma.licenses.findFirst({
      where: {
        responsible_id: createLicenseDto.responsible_id,
      },
    });
    if (hasLicense) throw new NotFoundException('O responsável já possui uma licença');
    const newLicense = await this.prisma.licenses.create({ data: createLicenseDto });
    if (!newLicense) throw new NotFoundException('Erro ao criar licença');

    const newUser: CreateUserDto = {
      name: responsible.name,
      active: true,
      avatar: '',
      email: getEmailsFromString(responsible.email),
      password: responsible.cpf_cnpj,
      license_id: newLicense.id,
      role_id: 2,
    };

    await this.newReguaInstance(newLicense.id);

    return this.users.create(newUser);
  }

  private async newReguaInstance(license_id: number) {
    const reguaPadrao = await this.prisma.reguas.findFirst({
      where: { active: true, license_id: 1 },
      include: { FasesRegua: true },
    });
    if (!reguaPadrao) throw new NotFoundException('Regua padrão não encontrada');

    return this.prisma.reguas.create({
      data: {
        license_id,
        name: reguaPadrao.name,
        active: true,
        tipo_regua: reguaPadrao.tipo_regua,
        FasesRegua: {
          createMany: {
            data: reguaPadrao.FasesRegua.map((fase) => {
              return {
                fase: fase.fase,
                cron: fase.cron,
                duracao: fase.duracao,
                inicio: fase.inicio,
                active: fase.active,
                mensagem: fase.mensagem,
              } as CreateFasesReguaDto;
            }),
          },
        },
      },
    });
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
    return this.prisma.licenses.delete({ where: { id } });
  }

  async haveUsers(license_id: number): Promise<boolean> {
    return this.prisma.users.findFirst({ where: { license_id } }).then((user) => !!user);
  }
}
