import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcelasOperacaoService } from './parcelas-operacao.service';
import { CreateParcelasOperacaoDto } from './dto/create-parcelas-operacao.dto';
import { UpdateParcelasOperacaoDto } from './dto/update-parcelas-operacao.dto';

@Controller('parcelas-operacao')
export class ParcelasOperacaoController {
  constructor(private readonly parcelasOperacaoService: ParcelasOperacaoService) {}

  @Post()
  create(@Body() createParcelasOperacaoDto: CreateParcelasOperacaoDto) {
    return this.parcelasOperacaoService.create(createParcelasOperacaoDto);
  }

  @Get()
  findAll() {
    return this.parcelasOperacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcelasOperacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcelasOperacaoDto: UpdateParcelasOperacaoDto) {
    return this.parcelasOperacaoService.update(+id, updateParcelasOperacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcelasOperacaoService.remove(+id);
  }
}
