import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DividasService } from './dividas.service';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';

@Controller('dividas')
export class DividasController {
  constructor(private readonly dividasService: DividasService) {}

  @Post()
  create(@Body() createDividaDto: CreateDividaDto) {
    return this.dividasService.create(createDividaDto);
  }

  @Get()
  findAll() {
    return this.dividasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dividasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDividaDto: UpdateDividaDto) {
    return this.dividasService.update(+id, updateDividaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dividasService.remove(+id);
  }
}
