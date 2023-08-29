import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EnderecosController],
  providers: [EnderecosService],
  exports: [EnderecosService],
})
export class EnderecosModule {}
