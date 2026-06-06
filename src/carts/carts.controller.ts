import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
