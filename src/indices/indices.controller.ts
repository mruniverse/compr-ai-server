import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndicesService } from './indices.service';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';

@Controller('indices')
export class IndicesController {
  constructor(private readonly indicesService: IndicesService) {}

  @Post()
  create(@Body() createIndexDto: CreateIndexDto) {
    const { valor } = createIndexDto;
    return this.indicesService.create({ ...createIndexDto, valor: Number(valor) });
  }

  @Get()
  findAll() {
    return this.indicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndexDto: UpdateIndexDto) {
    return this.indicesService.update(+id, updateIndexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicesService.remove(+id);
  }
}
