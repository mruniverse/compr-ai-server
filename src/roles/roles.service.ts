import { Prisma, Users } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async findWhereAllowed(loggedUser: Users): Promise<Prisma.RolesWhereInput> {
    if (!loggedUser.role_id) throw new Error('Usuário sem credenciais');

    const where: Prisma.RolesWhereInput = {
      id: {
        gte: loggedUser.role_id,
      },
    };

    return where;
  }

  createWithPermissions(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: {
        name: createRoleDto.name,
        Permissions: {
          connect: createRoleDto.permissions.map((permission) => ({
            id: permission,
          })),
        },
      },
    });
  }

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: createRoleDto,
    });
  }

  findAllWithPermissions(where?: Prisma.RolesWhereInput) {
    return this.prisma.roles.findMany({
      where,
      include: {
        Permissions: true,
      },
    });
  }

  findAll(where: Prisma.RolesWhereInput) {
    return this.prisma.roles.findMany({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  roleExists(name: string) {
    return this.prisma.roles.findFirst({ where: { name } });
  }

  updateWithPermissions(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
        Permissions: {
          set: updateRoleDto.permissions.map((permission) => ({
            id: permission,
          })),
        },
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
