import { Users } from '@prisma/client';
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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService, private readonly licenses: LicensesService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const license = await this.licenses.findOne({ id: user.license_id });
    if (!license) throw new NotFoundException('Licença não encontrada');

    const existingUser = await this.users.findByEmail(user.email);
    if (existingUser) throw new ConflictException('Usuário já cadastrado');

    const maxUsers = (await license.Users).length > license.max_users;
    if (maxUsers) throw new ConflictException('Limite de usuários excedido');

    return await this.users.create(user);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: CreateUserDto) {
    if (user.role_id) {
      await this.users.updateUser({
        where: { id: +id },
        data: { Role: { connect: { id: user.role_id } } },
      });

      delete user.role_id;
    }

    return this.users.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.users.findOne({ id: +id });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.users.deleteUser({ id: +id });
  }
}
