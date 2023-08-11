import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private permissions: PermissionsService) {}

  async user(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
    });
  }

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async create(user: CreateUserDto): Promise<Users> {
    const hash = await bcrypt.hash(user.password, 10);
    const permissions = await this.permissions.findBasicPermissions();

    let newUser: Users;
    newUser = await this.prisma.users.create({
      data: {
        ...user,
        password: hash,
        Permissions: { connect: permissions.map((p) => ({ id: p.id })) },
      },
    });

    if (user.role_id) {
      newUser = await this.updateUser({
        where: { id: newUser.id },
        data: { Role: { connect: { id: user.role_id } } },
      });
    }

    if (user.permissions_id) {
      newUser = await this.updateUser({
        where: { id: newUser.id },
        data: {
          Permissions: { connect: user.permissions_id.map((id) => ({ id })) },
        },
      });
    }

    return newUser;
  }

  async findOne(params: { id: number }): Promise<Users> {
    const { id } = params;
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async updateUser(params: { where: Prisma.UsersWhereUniqueInput; data: Prisma.UsersUpdateInput }): Promise<Users> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({
      where,
    });
  }
}
