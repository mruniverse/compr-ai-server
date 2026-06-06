import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly lists: ListsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.lists.findAllByUser(user.id);
  }

  @Post()
  async create(@CurrentUser() user: JwtUser, @Body() body: CreateListDto) {
    const list = await this.lists.create(user.id, body);
    return { message: 'Lista criada com sucesso', list };
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.lists.findOne(user.id, id);
  }

  @Patch(':id')
  async update(@CurrentUser() user: JwtUser, @Param('id') id: string, @Body() body: UpdateListDto) {
    const list = await this.lists.update(user.id, id, body);
    return { message: 'Lista atualizada', list };
  }

  @Delete(':id')
  async remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    await this.lists.remove(user.id, id);
    return { message: 'Lista removida' };
  }

  @Post(':id/finish')
  async finish(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    const { cart, list } = await this.lists.finish(user.id, id);
    return { message: 'Compra finalizada com sucesso', cart, list };
  }
}
