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
import { TipoOperacaoService } from 'src/tipo-operacao/tipo-operacao.service';

@Controller('dividas')
export class DividasController {
  constructor(private readonly dividasService: DividasService, private tipoOperacao: TipoOperacaoService) {}

  @Post()
  async create(@Request() request: Request & { user: Users }, @Body() createDividaDto: CreateDividaDto) {
    if (createDividaDto.credor_id == createDividaDto.devedor_id) {
      throw new BadRequestException('Credor e devedor não podem ser os mesmos');
    }

    const tiposOperacoes = createDividaDto.TiposOperacoes;
    delete createDividaDto.documento_contratual;
    delete createDividaDto.TiposOperacoes;

    const newDivida = await this.dividasService.create(createDividaDto, request.user.license_id);
    if (!newDivida) throw new BadRequestException('Não foi possível criar a dívida');
    if (tiposOperacoes) return await this.tipoOperacao.create({ ...tiposOperacoes, divida_id: newDivida.id });
    return newDivida;
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
