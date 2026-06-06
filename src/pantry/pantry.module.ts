import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { PantryService } from './pantry.service';
import { PantryController } from './pantry.controller';

@Module({
  imports: [PrismaModule],
  providers: [PantryService],
  controllers: [PantryController],
})
export class PantryModule {}
