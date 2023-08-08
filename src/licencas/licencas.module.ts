import { Module } from '@nestjs/common';
import { LicencasService } from './licencas.service';
import { LicencasController } from './licencas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LicencasController],
  providers: [LicencasService],
  exports: [LicencasService],
})
export class LicencasModule {}
