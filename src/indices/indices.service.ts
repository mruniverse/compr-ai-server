import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';

@Injectable()
export class IndicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIndexDto: CreateIndexDto) {
    return this.prisma.indices.create({
      data: createIndexDto,
    });
  }

  findAll() {
    return this.prisma.indices.findMany();
  }

  findOne(id: number) {
    return this.prisma.indices.findUnique({
      where: { id },
    });
  }

  update(id: number, updateIndexDto: UpdateIndexDto) {
    return this.prisma.indices.update({
      where: { id },
      data: updateIndexDto,
    });
  }

  remove(id: number) {
    return this.prisma.indices.delete({
      where: { id },
    });
  }
}
