import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from '../../src/user_auth/entity/user';
import { Tag } from './entity/tag';
import { Task } from './entity/task';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task, User, Tag])]
})
export class TaskModule {}
