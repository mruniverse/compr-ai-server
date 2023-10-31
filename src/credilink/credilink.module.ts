import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CredilinkService } from './credilink.service';
import { CredilinkController } from './credilink.controller';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [
    PrismaModule,
    SoapModule.register({
      clientName: 'CrediLink',
      uri: 'https://consulta.confirmeonline.com.br/Integracao/Consulta?wsdl',
    }),
  ],
  controllers: [CredilinkController],
  providers: [CredilinkService],
})
export class CredilinkModule {}
