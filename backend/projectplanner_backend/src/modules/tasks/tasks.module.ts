import { TaskService } from './tasks.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { TaskController } from './tasks.controller';
import { TaskProvider } from './tasks.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...TaskProvider, TaskService],
  exports: [...TaskProvider, TaskService],
})
export class TaskModule {}
