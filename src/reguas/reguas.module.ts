import { UsersModule } from './../users/users.module';
import { AuthService } from './../auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ReguaService } from './reguas.service';
import { ReguasController } from './reguas.controller';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [ReguasController],
  providers: [ReguaService, AuthService],
})
export class ReguaModule {}
