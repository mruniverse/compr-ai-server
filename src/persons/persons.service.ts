import { UpdateDividaDto } from './../dividas/dto/update-divida.dto';
import { EnderecosService } from './../enderecos/enderecos.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import CreatePersonDto from './dto/create-person.dto';
import UpdatePersonDto from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService, private endereco: EnderecosService) {}

  async exists(email: string, cpf_cnpj: string) {
    const person = await this.prisma.persons.findFirst({
      where: {
        OR: [{ email }, { cpf_cnpj }],
      },
    });

    return person ? true : false;
  }

  async search(search: string) {
    return await this.prisma.persons.findMany({
      orderBy: {
        _relevance: {
          fields: ['name', 'email', 'cpf_cnpj'],
          search: search,
          sort: 'desc',
        },
      },
      include: {
        Enderecos: true,
      },
    });
  }

  async create(createPersonDto: CreatePersonDto) {
    let newPerson: any = {
      ...createPersonDto,
      Ramos: {
        connect: {
          id: createPersonDto.ramo_id,
        },
      },
    };

    if (newPerson.enderecos.length) {
      newPerson = {
        ...newPerson,
        Enderecos: {
          create: [
            ...createPersonDto.enderecos.map((endereco) => {
              delete endereco.person_id;
              return endereco;
            }),
          ],
        },
      };
    }

    delete newPerson.ramo_id;
    delete newPerson.enderecos;

    return this.prisma.persons.create({
      data: {
        ...newPerson,
      },
    });
  }

  findAll() {
    return this.prisma.persons.findMany({
      include: {
        Enderecos: true,
      },
    });
  }

  findOneWithLicense(id: number) {
    return this.prisma.persons.findUnique({
      where: { id },
      include: {
        Enderecos: true,
        License: {
          select: {
            id: true,
            Users: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.persons.findUnique({
      where: { id },
      include: {
        License: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    if (updatePersonDto.nascimento) {
      delete updatePersonDto.nascimento;
    }

    if (updatePersonDto.casamento) {
      delete updatePersonDto.casamento;
    }

    if (updatePersonDto.enderecos) {
      updatePersonDto.enderecos.forEach(async (endereco) => {
        if (!endereco.id) {
          await this.endereco.create({ ...endereco, person_id: id });
        } else {
          await this.endereco.update(endereco.id, endereco);
        }
      });
    }

    delete updatePersonDto.enderecos;

    return this.prisma.persons.update({ where: { id }, data: updatePersonDto });
  }

  remove(id: number) {
    return this.prisma.persons.delete({ where: { id } });
  }
}
