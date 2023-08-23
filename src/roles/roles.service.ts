import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

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

  findAllWithPermissions() {
    return this.prisma.roles.findMany({
      include: {
        Permissions: true,
      },
    });
  }

  findAll() {
    return this.prisma.roles.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
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
