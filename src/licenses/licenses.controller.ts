import { Prisma, Users } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licenses: LicensesService) {}

  @Post()
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licenses.create(createLicenseDto);
  }

  @Get()
  async findAll(@Request() request: Request & { user: Users }) {
    let where: Prisma.LicensesWhereInput = {};
    try {
      where = await this.licenses.findWhereAllowed(request.user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return this.licenses.findAll(where);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenses.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    return this.licenses.update(+id, updateLicenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const haveUsers = await this.licenses.haveUsers(+id);
    if (haveUsers) throw new UnauthorizedException('Não é possível excluir uma licença com usuários vinculados');
    return this.licenses.remove(+id);
  }
}
