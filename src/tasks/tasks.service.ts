import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
    private http: HttpService,
    private mailerService: MailerService,
  ) {}

  @Cron('* * * * *')
  async handleCron() {
    const fases = await this.prisma.statusFaseDividas.findMany({
      include: {
        FaseRegua: true,
        Divida: {
          select: {
            data_vencimento: true,
            created_at: true,
            Devedor: {
              select: {
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    fases.forEach(async (fase) => {
      const dataAtual = new Date();
      const dataVencimento = new Date(fase.Divida.data_vencimento);
      const diffInDaysFromVencimento = Math.ceil((dataVencimento.getTime() - dataAtual.getTime()) / (1000 * 3600 * 24));
      const diffInDaysFromCreated = Math.ceil(
        (fase.Divida.created_at.getTime() - dataAtual.getTime()) / (1000 * 3600 * 24),
      );

      const vencido = diffInDaysFromVencimento + fase.FaseRegua.inicio <= 0;
      const vencidoCriado = diffInDaysFromCreated + fase.FaseRegua.inicio <= 0;
      const ativo = fase.active;
      if (vencido && vencidoCriado && !ativo) {
        console.log('entrou');
        await this.prisma.statusFaseDividas.update({ where: { id: fase.id }, data: { active: true } });
        this.registerCron(fase, fase.FaseRegua.cron, fase.Divida.Devedor.phone, fase.FaseRegua.mensagem);
      }
    });
  }

  registerCron(fase: any, cron: string, number: string, message: string) {
    const job = new CronJob(cron, () => {
      switch (fase.FaseRegua.fase) {
        case 'whatsapp':
          this.sendWhatsapp(number, message);
          break;
        case 'email':
          this.sendEmail(message, fase.Divida.Devedor.email);
          break;
      }
    });

    this.schedulerRegistry.addCronJob(`${fase.Divida.id}-${fase.id}`, job);
    job.start();
  }

  sendWhatsapp(number: string, message: string) {
    const url = `http://149.100.154.223:3033/sendText`;
    const headers = {
      'Content-Type': 'application/json',
      Sessionkey: '123456',
    };
    const body = JSON.stringify({
      session: 'whatsapp',
      number: `55${number.match(/\d+/g)?.join('')}`,
      text: message,
    });

    return this.http.post(url, body, { headers });
  }

  async sendEmail(message: string, email: string) {
    return await this.mailerService.sendMail({
      to: email,
      from: 'atendimento@legisonline.com.br',
      subject: 'A3 Recovery - Cobrança',
      text: message,
    });
  }
}
