import { Users, Prisma } from '@prisma/client';
import { LicensesService } from './../licenses/licenses.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  ConflictException,
  Param,
  Patch,
  Delete,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService, private readonly licenses: LicensesService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const license = await this.licenses.findOne({ id: user.license_id });
    if (!license) throw new NotFoundException('Licença não encontrada');

    const existingUser = await this.users.findUniqueByEmail(user.email);
    if (existingUser) throw new ConflictException('Usuário já cadastrado');

    const maxUsers = license.Users?.length >= license.max_users;
    if (maxUsers) throw new ConflictException('Limite de usuários excedido');

    return await this.users.create(user);
  }

  @Get()
  async findAll(@Query('include') include: Array<string>, @Request() request: Request & { user: Users }) {
    let where: Prisma.UsersWhereInput = {};
    try {
      where = await this.users.findWhereAllowed(request.user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return include?.includes('person') ? this.users.findAllWithPerson(where) : this.users.findAll(where);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: CreateUserDto, @Request() request: Request & { user: Users }) {
    if (!this.users.findIfCreateOrUpdateAllowed(user, request.user)) throw new UnauthorizedException('Não autorizado');

    return this.users.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() request: Request & { user: Users }) {
    if (!this.users.findIfDeleteAllowed(+id, request.user)) throw new UnauthorizedException('Não autorizado');

    const user = await this.users.findUnique({ id: +id });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.users.deleteUser({ id: +id });
  }
}
