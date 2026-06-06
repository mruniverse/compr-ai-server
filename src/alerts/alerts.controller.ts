import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alerts: AlertsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.alerts.findAllByUser(user.id);
  }

  @Post()
  async create(@CurrentUser() user: JwtUser, @Body() body: CreateAlertDto) {
    const alert = await this.alerts.create(user.id, body);
    return { message: 'Alerta criado com sucesso', alert };
  }

  @Patch(':id')
  async update(@CurrentUser() user: JwtUser, @Param('id') id: string, @Body() body: UpdateAlertDto) {
    const alert = await this.alerts.update(user.id, id, body);
    return { message: 'Alerta atualizado', alert };
  }

  @Delete(':id')
  async remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    await this.alerts.remove(user.id, id);
    return { message: 'Alerta removido' };
  }
}
