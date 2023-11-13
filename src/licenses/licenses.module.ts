import { UsersModule } from './../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PersonsModule } from './../persons/persons.module';
import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule, PersonsModule, UsersModule],
  controllers: [LicensesController],
  providers: [LicensesService],
  exports: [LicensesService],
})
export class LicensesModule {}
