import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import CreateEnderecoDto from './dto/create-endereco.dto';
import UpdateEnderecoDto from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(private prisma: PrismaService) {}

  create(createEnderecoDto: CreateEnderecoDto) {
    return this.prisma.enderecos.create({
      data: {
        ...createEnderecoDto,
      },
    });
  }

  findAll() {
    return this.prisma.enderecos.findMany();
  }

  findOne(id: number) {
    return this.prisma.enderecos.findUnique({
      where: { id },
    });
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return this.prisma.enderecos.update({
      where: { id },
      data: {
        ...updateEnderecoDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.enderecos.delete({
      where: { id },
    });
  }
}
