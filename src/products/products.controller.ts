import { Body, Controller, Get, NotFoundException, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  // The global ValidationPipe has transform off, so coerce `limit` here.
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: QueryProductsDto,
  ) {
    return this.products.search(query.search, query.limit);
  }

  // Static route declared before ':id' so 'barcode' is not parsed as an id.
  @Get('barcode/:code')
  async findByBarcode(@Param('code') code: string) {
    const product = await this.products.findByBarcode(code);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.products.findOne(id);
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.products.upsert(dto);
    return { message: 'Produto cadastrado com sucesso', product };
  }
}
