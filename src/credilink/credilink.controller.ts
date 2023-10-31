import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CredilinkService } from './credilink.service';
import { CreateCredilinkDto } from './dto/create-credilink.dto';
import { UpdateCredilinkDto } from './dto/update-credilink.dto';
import { Response } from 'express';

@Controller('credilink')
export class CredilinkController {
  constructor(private readonly credilinkService: CredilinkService) {}

  @Post()
  create(@Body() createCredilinkDto: CreateCredilinkDto) {
    return this.credilinkService.create(createCredilinkDto);
  }

  @Get()
  findAll() {
    return this.credilinkService.findAll();
  }

  @Get(':cpfcnpj')
  async findOne(@Res() response: Response, @Param('cpfcnpj') cpfcnpj: string) {
    this.credilinkService
      .findOne(cpfcnpj)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((err) => {
        return response.status(400).json({ error: err });
      });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCredilinkDto: UpdateCredilinkDto) {
    return this.credilinkService.update(+id, updateCredilinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credilinkService.remove(+id);
  }
}
