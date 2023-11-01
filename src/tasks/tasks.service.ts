import { HttpService } from './../http/http.service';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

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

      try {
        this.schedulerRegistry.getCronJob(this.getCronJobName(fase));
      } catch (error) {
        const vencido = diffInDaysFromVencimento + fase.FaseRegua.inicio <= 0;
        const vencidoCriado = diffInDaysFromCreated + fase.FaseRegua.inicio <= 0;

        if (vencido && vencidoCriado) {
          await this.prisma.statusFaseDividas.update({ where: { id: fase.id }, data: { active: true } });
          this.registerCron(fase, fase.FaseRegua.cron, fase.FaseRegua.mensagem);
        }
      }
    });
  }

  registerCron(fase: any, cron: string, message: string) {
    const job = new CronJob(cron, () => {
      console.log(
        'executando cron',
        fase.Divida.Devedor.phone,
        fase.active,
        fase.FaseRegua.active,
        fase.FaseRegua.fase,
      );
      if (fase.active && fase.FaseRegua.active) {
        switch (fase.FaseRegua.fase) {
          case 'whatsapp':
            this.sendWhatsapp(fase.Divida.Devedor.phone, message);
            break;
          case 'email':
            this.sendEmail(message, fase.Divida.Devedor.email);
            break;
        }
      }
    });

    this.schedulerRegistry.addCronJob(this.getCronJobName(fase), job);
    job.start();
  }

  getCronJobName(fase: any) {
    return `${fase.Divida.id}-${fase.id}`;
  }

  sendWhatsapp(number: string, message: string) {
    console.log('enviando whatsapp', number);

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

    this.http.post(url, body, { headers }).catch(({ data }) => console.log(data));
  }

  async sendEmail(message: string, email: string) {
    return await this.mailerService
      .sendMail({
        to: email,
        from: 'atendimento@legisonline.com.br',
        subject: 'A3 Recovery - Cobrança',
        text: message,
      })
      .catch((err) => console.log(err));
  }
}
