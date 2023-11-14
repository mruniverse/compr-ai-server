import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async privateUser(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    return user;
  }

  async findWhereAllowed(loggedUser: Users): Promise<Prisma.UsersWhereInput> {
    if (!loggedUser.role_id || !loggedUser.license_id) throw new Error('Usuário sem credenciais');

    let where: Prisma.UsersWhereInput = {};
    if (loggedUser.role_id >= 2) {
      where = {
        role_id: {
          gte: 2,
        },
        License: {
          id: loggedUser.license_id,
        },
      };
    }

    return where;
  }

  findIfCreateOrUpdateAllowed(newUser: CreateUserDto, loggedUser: Users): boolean {
    if (loggedUser.role_id === 1) return true;

    const allowLicense = loggedUser.license_id ? loggedUser.license_id === newUser.license_id : true;
    const allowRole = loggedUser.role_id ? loggedUser.role_id <= newUser.role_id : true;
    const allowPassword = newUser.password ? allowRole : true;

    return allowLicense && allowRole && allowPassword;
  }

  async findIfDeleteAllowed(userId: number, loggedUser: Users): Promise<boolean> {
    if (loggedUser.role_id === 1) return true;
    const { license_id, role_id } = await this.findUnique({ id: userId });
    const allowLicense = loggedUser.license_id ? loggedUser.license_id === license_id : true;
    const allowRole = loggedUser.role_id ? loggedUser.role_id <= role_id : true;

    return allowLicense && allowRole;
  }

  private usersExceptAttribute(users: Users[], keys: string[]) {
    return users.map((user) => {
      keys.forEach((key) => {
        delete user[key];
      });
      return user;
    });
  }

  async findAllWithPerson(where: Prisma.UsersWhereInput) {
    const users = await this.prisma.users.findMany({
      where,
      include: {
        License: {
          select: {
            id: true,
            Person: true,
          },
        },
      },
    });

    return this.usersExceptAttribute(users, ['password']);
  }

  async findAll(where: Prisma.UsersWhereInput): Promise<GetUsersDto[]> {
    const users = await this.prisma.users.findMany({ where });
    return this.usersExceptAttribute(users, ['password']);
  }

  async findUniqueWithPermissions(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | any> {
    const user = await this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
      include: {
        Role: {
          select: {
            name: true,
            Permissions: {
              select: {
                id: true,
                name: true,
                route: true,
              },
            },
          },
        },
      },
    });

    return this.usersExceptAttribute([user], ['password'])[0];
  }

  async findUnique(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | any> {
    const user = await this.prisma.users.findUnique({
      where: UsersWhereUniqueInput,
    });

    return this.usersExceptAttribute([user], ['password'])[0];
  }

  async findUniqueByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async create(user: CreateUserDto): Promise<Users> {
    const hash = await bcrypt.hash(user.password, 10);

    let newUser: Users;
    newUser = await this.prisma.users.create({
      data: {
        ...user,
        password: hash,
      },
    });

    if (user.role_id) {
      newUser = await this.prisma.users.update({
        where: { id: newUser.id },
        data: { Role: { connect: { id: user.role_id } } },
      });
    }

    return newUser;
  }

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    let password: string;
    if (user.password) {
      password = await bcrypt.hash(user.password, 10);
    }

    return this.prisma.users.update({
      where: { id },
      data: {
        ...user,
        password,
      },
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({
      where,
    });
  }
}
