import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LicencasService } from './licencas.service';
import { CreateLicencaDto } from './dto/create-licenca.dto';
import { UpdateLicencaDto } from './dto/update-licenca.dto';

@Controller('licencas')
export class LicencasController {
  constructor(private readonly licencasService: LicencasService) {}

  @Post()
  create(@Body() createLicencaDto: CreateLicencaDto) {
    return this.licencasService.create(createLicencaDto);
  }

  @Get()
  findAll() {
    return this.licencasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licencasService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicencaDto: UpdateLicencaDto) {
    return this.licencasService.update(+id, updateLicencaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licencasService.remove(+id);
  }
}
