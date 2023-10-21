import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FasesReguaService } from './fases-regua.service';
import { CreateFasesReguaDto } from './dto/create-fases-regua.dto';
import { UpdateFasesReguaDto } from './dto/update-fases-regua.dto';

@Controller('fases-regua')
export class FasesReguaController {
  constructor(private readonly fasesReguaService: FasesReguaService) {}

  @Post()
  create(@Body() createFasesReguaDto: CreateFasesReguaDto) {
    return this.fasesReguaService.create(createFasesReguaDto);
  }

  @Get()
  findAll() {
    return this.fasesReguaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fasesReguaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFasesReguaDto: UpdateFasesReguaDto) {
    return this.fasesReguaService.update(+id, updateFasesReguaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fasesReguaService.remove(+id);
  }
}
