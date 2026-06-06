import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { PantryService } from './pantry.service';
import { CreatePantryItemDto } from './dto/create-pantry-item.dto';
import { UpdatePantryItemDto } from './dto/update-pantry-item.dto';

@Controller('pantry')
export class PantryController {
  constructor(private readonly pantry: PantryService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.pantry.findAllByUser(user.id);
  }

  // Static route declared before ':id' so it is not captured as an id param.
  @Get('suggestions')
  suggestions(@CurrentUser() user: JwtUser) {
    return this.pantry.suggestions(user.id);
  }

  @Post()
  async create(@CurrentUser() user: JwtUser, @Body() body: CreatePantryItemDto) {
    const item = await this.pantry.create(user.id, body);
    return { message: 'Item adicionado à despensa', item };
  }

  @Patch(':id')
  async update(@CurrentUser() user: JwtUser, @Param('id') id: string, @Body() body: UpdatePantryItemDto) {
    const item = await this.pantry.update(user.id, id, body);
    return { message: 'Item atualizado', item };
  }

  @Delete(':id')
  async remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    await this.pantry.remove(user.id, id);
    return { message: 'Item removido' };
  }
}
