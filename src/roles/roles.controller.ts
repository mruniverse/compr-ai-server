import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    if (createRoleDto.permissions) {
      return this.rolesService.createWithPermissions(createRoleDto);
    }
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query('include') include: Array<string>) {
    if (include?.includes('permissions')) {
      return this.rolesService.findAllWithPermissions();
    }

    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    if (updateRoleDto.permissions) {
      return this.rolesService.updateWithPermissions(+id, updateRoleDto);
    }
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
