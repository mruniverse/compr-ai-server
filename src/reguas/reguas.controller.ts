import { Users } from '@prisma/client';
import { AuthService } from './../auth/auth.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request } from '@nestjs/common';
import { ReguaService } from './reguas.service';
import { CreateReguaDto } from './dto/create-regua.dto';
import { UpdateReguaDto } from './dto/update-regua.dto';

@Controller('reguas')
export class ReguasController {
  constructor(private readonly regua: ReguaService, private auth: AuthService) {}

  @Post()
  async create(@Headers('Authorization') access_token: string, @Body() createReguaDto: CreateReguaDto) {
    const user = await this.auth.getMe(access_token);
    return this.regua.create(createReguaDto, user.license_id);
  }

  @Get()
  findAll(@Request() request: Request & { user: Users }) {
    return this.regua.findAll(request.user.license_id);
  }

  @Get('active')
  findActive(@Request() request: Request & { user: Users }) {
    return this.regua.findActive(request.user.license_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regua.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReguaDto: UpdateReguaDto) {
    return this.regua.update(+id, updateReguaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regua.remove(+id);
  }
}
