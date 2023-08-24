import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('search/:search')
  search(@Param('search') search: string) {
    if (!search) throw new NotFoundException('Nenhum resultado encontrado');
    return this.personsService.search(search);
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include: Array<string>) {
    if (!id || !+id) throw new BadRequestException('O id informado não é válido');
    if (include?.includes('license')) return this.personsService.findOneWithLicense(+id);
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const person = this.personsService.findOne(+id);
    if (!person) throw new NotFoundException('Pessoa não encontrada');

    const hasLicese = person.License;
    if (hasLicese) throw new ConflictException('Existem licenças vinculadas a esta pessoa');

    return this.personsService.remove(+id);
  }
}
