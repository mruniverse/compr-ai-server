import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LicencasModule } from './licencas/licencas.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    LicencasModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
