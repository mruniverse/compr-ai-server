import { Public } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Post, Body, NotFoundException, ConflictException, Param, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Public()
  @Post()
  async create(@Body() user: CreateUserDto) {
    const existingUser = await this.users.findUniqueByEmail(user.email);
    if (existingUser) throw new ConflictException('Usuário já cadastrado');

    try {
      await this.users.create(user);
    } catch (error) {
      throw new Error(error.message);
    }

    return { message: 'Usuário cadastrado com sucesso' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.users.findUnique({ id: id });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.users.deleteUser({ id: id });
  }
}
