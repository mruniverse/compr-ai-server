import { LicensesService } from './../licenses/licenses.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Post, Body, NotFoundException, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService, private readonly licenses: LicensesService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const license = await this.licenses.findOne({ id: user.license_id });
    if (!license) throw new NotFoundException('License not found');

    return await this.users.create(user);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }
}
