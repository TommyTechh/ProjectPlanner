import { Injectable } from '@nestjs/common';
import { TagsDto, TaskDto } from './dto/task.dto';
import { Task } from './entity/task';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { AssigneeDto } from '../../src/user_auth/dto/assignee.dto';
import { User } from '../user_auth/entity/user';

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

    
    async getOwnerTasks(id: string): Promise<Task[]> {

        const owner = await this.userRepository.findOneOrFail({
            where: {id}
        });
        
        const task = this.taskRepository.find({where: {owner}});

        if(!task){
            throw new HttpException('You don\'t own any tasks', HttpStatus.NOT_FOUND)
        }
        return task;
    }




    //creates a task with neccesary class validation from TaskDto setus the owner.
    async createTask(taskDto: TaskDto, id: string): Promise<void>{
        const owner = await this.userRepository.findOneOrFail({
            where: {id: id}
        })

        await this.taskRepository.save({...taskDto, owner});
    }

    //Updates task description and is only allowed by the owner
    async updateTask(id: string, title:string, description: string, tags: TagsDto[], assignees: AssigneeDto[], userId: string){
        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['tags']
        });

        if (task.owner.id !== userId || task.assignees.find(x => x.id == userId)){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }
        await this.taskRepository.update({id}, {title});
        await this.taskRepository.update({id}, {description});
        await this.taskRepository.update({id}, {tags});
        await this.taskRepository.update({id}, {assignees});
    }

    //deletes task and is only allwoed by the owner
    async deleteTask(id: string, userid: string){

        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['owner']
        });

        if (task.owner.id!== userid){
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