import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private permissions: PermissionsService) {}

  async privateUser(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    return user;
  }

  async user(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | any> {
    return this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        license_id: true,
        active: true,
        avatar: true,
        role_id: true,
      },
    });
  }

  findAll(): Promise<GetUsersDto[]> {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        license_id: true,
        License: {
          select: {
            id: true,
            Person: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        active: true,
        avatar: true,
        role_id: true,
      },
    });
  }

  async create(user: CreateUserDto): Promise<Users> {
    const hash = await bcrypt.hash(user.password, 10);

    let newUser: Users;
    newUser = await this.prisma.users.create({
      data: {
        ...newUser,
        password: hash,
      },
    });

    if (user.role_id) {
      newUser = await this.updateUser({
        where: { id: newUser.id },
        data: { Role: { connect: { id: user.role_id } } },
      });
    }

    return newUser;
  }

  async findByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findOne(params: { id: number }): Promise<Users> {
    const { id } = params;
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    const hash = await bcrypt.hash(user.password, 10);
    return this.prisma.users.update({
      data: {
        ...user,
        password: hash,
      },
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
