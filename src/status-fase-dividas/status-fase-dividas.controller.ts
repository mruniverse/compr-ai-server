import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusFaseDividasService } from './status-fase-dividas.service';
import { CreateStatusFaseDividaDto } from './dto/create-status-fase-divida.dto';
import { UpdateStatusFaseDividaDto } from './dto/update-status-fase-divida.dto';

@Controller('status-fase-dividas')
export class StatusFaseDividasController {
  constructor(private readonly statusFaseDividasService: StatusFaseDividasService) {}

  @Post()
  create(@Body() createStatusFaseDividaDto: CreateStatusFaseDividaDto) {
    return this.statusFaseDividasService.create(createStatusFaseDividaDto);
  }

  @Get()
  findAll() {
    return this.statusFaseDividasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusFaseDividasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusFaseDividaDto: UpdateStatusFaseDividaDto) {
    return this.statusFaseDividasService.update(+id, updateStatusFaseDividaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusFaseDividasService.remove(+id);
  }
}
