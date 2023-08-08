import { Licencas } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LicencasService } from 'src/licencas/licencas.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private licenca: LicencasService,
  ) {}

  @Post('user')
  async createUser(@Body() user: CreateUserDto) {
    const { password } = user;
    const licenca: Licencas = await this.licenca.findOne({ id: 0 });
    const hash = await bcrypt.hash(password, 10);

    return this.usersService.createUser({
      ...user,
      password: hash,
      active: true,
      licenca: { connect: { id: licenca.id } },
    });
  }
}
