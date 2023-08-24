import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async search(search: string) {
    return await this.prisma.persons.findMany({
      orderBy: {
        _relevance: {
          fields: ['name', 'email', 'cpf_cnpj'],
          search: search,
          sort: 'desc',
        },
      },
    });
  }

  // return errror if person already exists
  async create(createPersonDto: CreatePersonDto) {
    const person = await this.prisma.persons.findFirst({
      where: {
        OR: [{ email: createPersonDto.email }, { cpf_cnpj: createPersonDto.cpf_cnpj }],
      },
    });

    if (person) throw new ConflictException('Person already exists');
    return this.prisma.persons.create({
      data: {
        name: createPersonDto.name,
        cpf_cnpj: createPersonDto.cpf_cnpj,
        email: createPersonDto.email,
        address: createPersonDto.address,
        city: createPersonDto.city,
        number: createPersonDto.number,
        ie: createPersonDto.ie,
        state: createPersonDto.state,
        phone: createPersonDto.phone,
      },
    });
  }

  findAll() {
    return this.prisma.persons.findMany();
  }

  findOneWithLicense(id: number) {
    return this.prisma.persons.findUnique({
      where: { id },
      include: {
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
    return this.prisma.persons.findUnique({ where: { id } });
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.prisma.persons.update({ where: { id }, data: updatePersonDto });
  }

  remove(id: number) {
    return this.prisma.persons.delete({ where: { id } });
  }
}
