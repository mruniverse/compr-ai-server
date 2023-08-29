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
import CreatePersonDto from './dto/create-person.dto';
import UpdatePersonDto from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly persons: PersonsService) {}

  @Get('search/:search')
  search(@Param('search') search: string) {
    if (!search) throw new NotFoundException('Nenhum resultado encontrado');
    return this.persons.search(search);
  }

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    if (await this.persons.exists(createPersonDto.email, createPersonDto.cpf_cnpj)) {
      throw new ConflictException('Person already exists');
    }

    const ramoExists = await this.persons.findOne(createPersonDto.ramo_id);
    if (!ramoExists) throw new BadRequestException('O ramo informado não é válido');

    return this.persons.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.persons.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include: Array<string>) {
    if (!id || !+id) throw new BadRequestException('O id informado não é válido');
    if (include?.includes('license')) return this.persons.findOneWithLicense(+id);
    return this.persons.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.persons.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const person = this.persons.findOne(+id);
    if (!person) throw new NotFoundException('Pessoa não encontrada');

    const hasLicese = person.License;
    if (hasLicese) throw new ConflictException('Existem licenças vinculadas a esta pessoa');

    return this.persons.remove(+id);
  }
}
