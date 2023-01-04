import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task';
import {v4} from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class TaskService {


    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}
    
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

    async createTask(task: TaskDto): Promise<void>{
        await this.taskRepository.save(task);
    }

    async updateDesription(id: string, description: string){
        await this.taskRepository.update({id}, {description});
    }

    async deleteTask(id: string){
        this.taskRepository.delete({id});

    }



}