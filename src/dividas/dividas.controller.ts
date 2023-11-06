import { Users, Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { DividasService } from './dividas.service';
import { CreateDividaDto } from './dto/create-divida.dto';
import { UpdateDividaDto } from './dto/update-divida.dto';

@Controller('dividas')
export class DividasController {
  constructor(private readonly dividasService: DividasService) {}

  @Post()
  create(@Request() request: Request & { user: Users }, @Body() createDividaDto: CreateDividaDto) {
    if (createDividaDto.credor_id == createDividaDto.devedor_id) {
      throw new BadRequestException('Credor e devedor não podem ser os mesmos');
    }

    delete createDividaDto.documento_contratual;
    delete createDividaDto.TiposOperacoes;

    return this.dividasService.create(createDividaDto, request.user.license_id);
  }

  @Post('vencimento')
  async vencimento(@Body('inicial') inicial: Date, @Body('final') final: Date) {
    return await this.dividasService.findAllByVencimento(inicial, final);
  }

  @Get()
  async findAll(@Request() request: Request & { user: Users }) {
    let where: Prisma.DividasWhereInput = {};
    try {
      where = await this.dividasService.findWhereAllowed(request.user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return this.dividasService.findAll(where);
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
