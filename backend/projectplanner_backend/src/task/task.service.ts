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
    
    //Returns all tasks
    async getTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    //returns specific task based on id
    async getTask (id: string): Promise<Task> {
        const task = this.taskRepository.findOne({where: {id}});
        if(!task){
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
        }
        return task;
    }

    //creates a task with neccesary class validation from TaskDto setus the owner.
    async createTask(taskDto: TaskDto, userName: string): Promise<void>{
        const owner = await this.userRepository.findOneOrFail({
            where: {username: userName}
        })

        await this.taskRepository.save({...taskDto, owner});
    }

    //Updates task description and is only allowed by the owner
    async updateDesription(id: string, description: string, userName: string){
        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['owner']
        });

        if (task.owner.username !== userName){
            throw new HttpException(
                "You're not the owner of this task", 400
            )
        }
        await this.taskRepository.update({id}, {description});
    }

    //deletes task and is only allwoed by the owner
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

        await this.taskRepository.delete({id});
    }

    async setImage(id: string, image:string){

        const user = await this.taskRepository.findOneOrFail({
            where: {id},
        }); //want to compare existing user with req object to auth. For now doesn't work.

        await this.taskRepository.update({id}, {image})
    }
}