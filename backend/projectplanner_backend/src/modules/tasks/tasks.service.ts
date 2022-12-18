import { Injectable, Inject } from '@nestjs/common';
import { TaskEntity } from 'src/db/model/task.entity';
import { Repository } from 'typeorm';
import {Request, Response} from "express"

@Injectable()
export class TaskService {

    constructor(
        @Inject("TASK_REPOSITORY")
        private taskEntity: Repository<TaskEntity>,
    ) {}
    
    async createTask(req: Request, res: Response){

        const {
            title,
            description,
            createdAt,
            is_completed
        } = req.body

        const taskEntity = new TaskEntity();

        taskEntity.title = title;
        taskEntity.title = description;
        taskEntity.title = createdAt;
        taskEntity.title = is_completed;

        taskEntity.save().then((data: TaskEntity) => {
            return res.send({
                status: true,
                data,
            })
        }).catch((error: Error) =>{
            return res.send({
            status: false,
            data: error.message
        })
    })
}
} 
