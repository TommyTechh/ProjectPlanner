import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import {Task } from './entity/task';
import { Tag } from './entity/tag'
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
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(User) private tagRepository: Repository<Tag>
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

    //Filters tasks and returns tasks that the user owns
    async getOwnerTasks(userId: string): Promise<Task[]> {

        const owner = await this.userRepository.findOneOrFail({
            where: {userId}
        });
        
        const task = this.taskRepository.find({where: {owner}});

        if(!task){
            throw new HttpException('You don\'t own any tasks', HttpStatus.NOT_FOUND)
        }
        return task;
    }




    //creates a task with neccesary class validation from TaskDto sets the owner.
    async createTask(taskDto: TaskDto, userId: string): Promise<void>{
        const owner = await this.userRepository.findOneOrFail({
            where: {userId: userId}
        })

        await this.taskRepository.save({...taskDto, owner});
    }

    //Updates task description and is only allowed by the owner
    async updateTask(id: string, taskDto: TaskDto, sub: string){
        const task = await this.taskRepository.findOneOrFail({
            where: {id}
        });

        if (task.owner.userId !== sub){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }
        await this.taskRepository.update({id}, {...taskDto});
    }



    //Inserts tag on task;
    async insertTag(id: string, name: string, sub: string){
        const task = await this.taskRepository.findOneOrFail({
            where: {id},
        });


        if (task.owner.userId !== sub){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }

        const newTag = new Tag();
        newTag.name = name;

        task.tags.push(newTag)

        await this.taskRepository.save(task)
    }

    //Deletes tag on task.
    async deleteTag(id:string, tagId: string, sub: string){
        
        const task = await this.taskRepository.findOneOrFail({
            where: {id}
        })

        const tag = task.tags.findIndex(x => x.tagId == tagId)
        console.log(tag)


        if (task.owner.userId !== sub){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }

        task.tags.splice(tag,1)
        await this.taskRepository.save(task)
    }

    //Sets assignee to specific task if assignee exists
    async setAssignee(id:string, userId: string, sub: string){
        
        const task = await this.taskRepository.findOneOrFail({
            where: {id}
        })

        const assignee = await this.userRepository.findOneOrFail({
            where: {userId}
        })


        if (task.owner.userId !== sub){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }

        if(!assignee){
            throw new HttpException(
                "User doesn't exist", 400
                )
        }

        if(task.assignees.find(x => x.userId == assignee.userId)){
            throw new HttpException(
                "User is already assigned to the task", 400
            )
        }

        task.assignees.push(assignee);
        await this.taskRepository.save(task)
    }

    //Deletes assignee if task has assignee
    async deleteAssignee(id:string, userId: string, sub: string){
        
        const task = await this.taskRepository.findOneOrFail({
            where: {id}
        })

        const user = task.assignees.findIndex(x => x.userId == userId)
        

        if (task.owner.userId !== sub){
            throw new HttpException(
                "You're not the owner or assigned to this task", 400
            )
        }

        if(user == -1){
            throw new HttpException(
                "User isn't assigned to the task", 400
            )
        }

        task.assignees.splice(user,1)
        await this.taskRepository.save(task)
    }









    //deletes task and is only allwoed by the owner
    async deleteTask(id: string, userid: string){

        const task = await this.taskRepository.findOneOrFail({
            where: {id},
            relations: ['owner']
        });

        if (task.owner.userId!== userid){
            throw new HttpException(
                "You're not the owner of this task", 400
            )
        }

        await this.taskRepository.delete({id});
    }
    




    //Sets image to task
    async setImage(id: string, image:string, userid:string ){


        const task = await this.taskRepository.findOneOrFail({
            where: {id}
        });

        if (task.owner.userId !== userid){
            throw new HttpException(
                "You're not the owner of this task", 400
            )
        }

        await this.taskRepository.update({id}, {image})
    }
}