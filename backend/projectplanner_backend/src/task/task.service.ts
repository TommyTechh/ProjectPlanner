import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task';
import {v4} from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { TaskModule } from './task.module';
import { User } from 'src/user_auth/entity/user';

@Injectable()
export class TaskService {


    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    async getTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async getTask (id: string): Promise<Task> {
        const task = this.taskRepository.findOne({where: {id}});
        if(!task){
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
        }
        return task;
    }

    async createTask(taskDto: TaskDto, userName: string): Promise<void>{
        const owner = await this.userRepository.findOneOrFail({
            where: {username: userName}
        })

        await this.taskRepository.save({...taskDto, owner});
    }

    async updateDesription(id: string, description: string, userid: string){
        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['owner']
        });

        if (task.owner.id !== userid){
            throw new HttpException(
                "Unauthorized", 400
            )
        }
        await this.taskRepository.update({id}, {description});
    }

    async deleteTask(id: string, userName: string){

        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['owner']
        });

        if (task.owner.username !== userName){
            throw new HttpException(
                "You're not the owner of this task", 400
            )
        }

        this.taskRepository.delete({id});

    }



}