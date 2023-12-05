import { Users } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TiposContratoService } from './tipos-contrato.service';
import { CreateTiposContratoDto } from './dto/create-tipos-contrato.dto';
import { UpdateTiposContratoDto } from './dto/update-tipos-contrato.dto';

@Controller('tipos-contrato')
export class TiposContratoController {
  constructor(private readonly tiposContratoService: TiposContratoService) {}

  @Post()
  create(@Body() createTiposContratoDto: CreateTiposContratoDto, @Request() request: Request & { user: Users }) {
    const { license_id } = request.user;
    return this.tiposContratoService.create(license_id, createTiposContratoDto);
  }

  @Get()
  findAll(@Request() request: Request & { user: Users }) {
    const { license_id } = request.user;
    return this.tiposContratoService.findAll(license_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposContratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposContratoDto: UpdateTiposContratoDto) {
    return this.tiposContratoService.update(+id, updateTiposContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposContratoService.remove(+id);
  }
}
