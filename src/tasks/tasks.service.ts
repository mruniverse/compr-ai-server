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
        this.schedulerRegistry.getCronJob(this.getCronJobName(fase.id, fase.FaseRegua.id));
      } catch (error) {
        const vencido = diffInDaysFromVencimento + fase.FaseRegua.inicio <= 0;
        const vencidoCriado = diffInDaysFromCreated + fase.FaseRegua.inicio <= 0;

        if (vencido && vencidoCriado) {
          await this.prisma.statusFaseDividas.update({ where: { id: fase.id }, data: { active: true } });
          this.registerCron(fase.id, fase.FaseRegua.id, fase.FaseRegua.cron);
        }
      }
    });
  }

  registerCron(statusFaseDividaId: number, faseReguaId: number, cron: string) {
    const job = new CronJob(cron, async () => {
      const statusFaseDivida = await this.getStatusFaseDivida(statusFaseDividaId);
      const statusDividaActive = statusFaseDivida.active;
      const statusReguaActive = statusFaseDivida.FaseRegua.active;
      const faseName = statusFaseDivida.FaseRegua.fase;
      const message = statusFaseDivida.FaseRegua.mensagem;
      const phone = statusFaseDivida.Divida.Devedor.phone;
      const email = statusFaseDivida.Divida.Devedor.email;

      if (statusDividaActive && statusReguaActive) {
        switch (faseName) {
          case 'whatsapp':
            this.sendWhatsapp(phone, message);
            break;
          case 'email':
            this.sendEmail(message, email);
            break;
          default:
            console.log('Nenhuma ação para ser executada');
            break;
        }
      }
    });

    this.schedulerRegistry.addCronJob(this.getCronJobName(statusFaseDividaId, faseReguaId), job);
    job.start();
  }

  getCronJobName(faseDividaId: number, faseReguaId: number) {
    return `${faseDividaId}-${faseReguaId}`;
  }

  sendWhatsapp(number: string, message: string) {
    console.log(`Enviando mensagem para ${number}`);

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
    console.log(`Enviando email para ${email}`);

    try {
      return await this.mailerService.sendMail({
        to: email,
        from: 'atendimento@legisonline.com.br',
        subject: 'A3 Recovery - Cobrança',
        text: message,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getStatusFaseDivida(statusFaseDividaId: number) {
    return await this.prisma.statusFaseDividas.findFirst({
      where: { id: statusFaseDividaId },
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
  }
}
