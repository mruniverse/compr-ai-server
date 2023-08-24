import { Users, Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    if (createRoleDto.permissions) {
      return this.roles.createWithPermissions(createRoleDto);
    }
    return this.roles.create(createRoleDto);
  }

  @Get()
  async findAll(@Query('include') include: Array<string>, @Request() request: Request & { user: Users }) {
    let where: Prisma.RolesWhereInput = {};
    try {
      where = await this.roles.findWhereAllowed(request.user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    if (include?.includes('permissions')) {
      return this.roles.findAllWithPermissions(where);
    }

    return this.roles.findAll(where);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roles.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    if (updateRoleDto.permissions) {
      return this.roles.updateWithPermissions(+id, updateRoleDto);
    }
    return this.roles.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roles.remove(+id);
  }
}
