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

  private usersExceptAttribute(users: Users[], keys: string[]): Partial<Users[]> {
    return users.map((user) => {
      keys.forEach((key) => {
        delete user[key];
      });
      return user;
    });
  }

  async findAll(where: Prisma.UsersWhereInput): Promise<Partial<Users[]>> {
    const users = await this.prisma.users.findMany({ where });
    return this.usersExceptAttribute(users, ['password']);
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

    return this.prisma.users.create({
      data: {
        ...user,
        password: hash,
      },
    });
  }

  async update(id: string, user: UpdateUserDto): Promise<Users> {
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
