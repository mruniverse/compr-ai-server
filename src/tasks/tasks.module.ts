import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
