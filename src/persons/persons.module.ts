import { EnderecosModule } from './../enderecos/enderecos.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';

@Module({
  imports: [PrismaModule, EnderecosModule],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
