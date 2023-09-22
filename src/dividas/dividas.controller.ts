import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DividasService } from './dividas.service';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';

@Controller('dividas')
export class DividasController {
  constructor(private readonly dividasService: DividasService) {}

  @Post()
  create(@Body() createDividaDto: CreateDividaDto) {
    if (createDividaDto.credor_id == createDividaDto.devedor_id) {
      throw new BadRequestException('Credor e devedor não podem ser os mesmos');
    }

    delete createDividaDto.documento_contratual;
    delete createDividaDto.tiposOperacao;

    return this.dividasService.create(createDividaDto);
  }

  @Post('vencimento')
  async vencimento(@Body('inicial') inicial: Date, @Body('final') final: Date) {
    return await this.dividasService.findAllByVencimento(inicial, final);
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
