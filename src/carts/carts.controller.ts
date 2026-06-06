import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly carts: CartsService) {}

  @Post()
  async create(@CurrentUser() user: JwtUser, @Body() body: CreateCartDto) {
    const cart = await this.carts.create(user.id, body.items);
    return { message: 'Compra salva com sucesso', cart };
  }

  @Get()
  async findAll(@CurrentUser() user: JwtUser) {
    return this.carts.findAllByUser(user.id);
  }

  @Patch(':id/reopen')
  async reopen(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    const cart = await this.carts.reopen(user.id, id);
    return { message: 'Compra reaberta', cart };
  }

  @Patch(':id')
  async update(@CurrentUser() user: JwtUser, @Param('id') id: string, @Body() body: CreateCartDto) {
    const cart = await this.carts.update(user.id, id, body.items);
    return { message: 'Compra atualizada', cart };
  }
}
