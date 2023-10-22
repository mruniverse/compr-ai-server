import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LicensesModule } from './licenses/licenses.module';
import { PersonsModule } from './persons/persons.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { RamosModule } from './ramos/ramos.module';
import { DividasModule } from './dividas/dividas.module';
import { TipoOperacaoModule } from './tipo-operacao/tipo-operacao.module';
import { IndicesModule } from './indices/indices.module';
import { ReguaModule } from './reguas/reguas.module';
import { FasesReguaModule } from './fases-regua/fases-regua.module';
import { StatusFaseDividasModule } from './status-fase-dividas/status-fase-dividas.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    LicensesModule,
    PersonsModule,
    PermissionsModule,
    RolesModule,
    EnderecosModule,
    RamosModule,
    DividasModule,
    TipoOperacaoModule,
    IndicesModule,
    ReguaModule,
    FasesReguaModule,
    StatusFaseDividasModule,
    TasksModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
