import { Controller, Req, Res, Post } from "@nestjs/common";
import { TaskService } from "./tasks.service";
import { Request, Response } from "express";



@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post("create_task")
    async createTask(@Req() req: Request, @Res() res: Response){
        return await this.taskService.createTask(req, res);
    }
}