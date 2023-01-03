import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { TaskDto } from './dto/task.dto';
import { updateDescriptionDto } from './dto/updateDescription.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Get()
    async getTasks(){
        return await this.taskService.getTasks();
    }

    @Get('/:id')
    async getTask(@Param() id: string){
        return await this.taskService.getTask(id);

    }


    @Post()
    async createTask(@Body() taskDto: TaskDto) {
        return await this.taskService.createTask(taskDto);
 
    }

    @Patch()
    async updateDescription(@Body() {description}: updateDescriptionDto, @Param() id: string){
        return await this.taskService.updateDesription(id, description)
    }

    @Delete('/:id')
    async deleteTask(@Param() id: string){
        return await this.taskService.deleteTask(id)
         
    }
}
