import { Body, ClassSerializerInterceptor, Controller, Get, ParseUUIDPipe, Post, ValidationPipe, Response } from '@nestjs/common';
import { Delete, Param, Patch, Put, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path')
import { of, subscribeOn } from 'rxjs';
import { JwtAuthGuard } from '../../src/user_auth/guard/jwt-auth.guard';
import { v4 } from 'uuid';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { TagsDto } from './dto/tag.dto';
import { AssigneeDto } from '../user_auth/dto/assignee.dto';

@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @UseInterceptors(ClassSerializerInterceptor) //Listens to class validation on user and excludes password on get-request
    @UseGuards(JwtAuthGuard)
    @Get()
    async getTasks(){
        return await this.taskService.getTasks();
    }

    @UseInterceptors(ClassSerializerInterceptor) //Listens to class validation on user and excludes password on get-request
    @UseGuards(JwtAuthGuard)
    @Get('/task/:id')
    async getTask(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.taskService.getTask(id);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/task')
    async createTask(@Body() taskDto: TaskDto, @Request() req) {
        const { sub } = req.user;
        return await this.taskService.createTask(taskDto, sub);

    }

    @UseGuards(JwtAuthGuard)
    @Patch('/task/:id')
    async updateTask(@Body() TaskDto: TaskDto, @Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const { sub } = req.user
        return await this.taskService.updateTask(id, TaskDto, sub)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/task/:id/tag')
    async insertTag(@Body() {name}: TagsDto, @Param('id', new ParseUUIDPipe()) id:string, @Request() req){
        const { sub } = req.user
        
        return await this.taskService.insertTag(id, name, sub)

    }


    @UseGuards(JwtAuthGuard)
    @Delete('/task/:id/tag/:tagId')
    async deleteTag(@Param('id', new ParseUUIDPipe()) id:string, @Param('tagId', new ParseUUIDPipe()) tagId:string, @Request() req){
        const { sub } = req.user
        
        return await this.taskService.deleteTag(id, tagId, sub)

    }


    @UseGuards(JwtAuthGuard)
    @Post('/task/:id/assignee')
    async setAssignee(@Body() {userId}: AssigneeDto, @Param('id', new ParseUUIDPipe()) id:string, @Request() req){
        const { sub } = req.user
        
        return await this.taskService.setAssignee(id, userId, sub)

    }

    @UseGuards(JwtAuthGuard)
    @Delete('/task/:id/assignee/:userId')
    async deleteAssignee(@Param('id', new ParseUUIDPipe()) id:string, @Param('userId', new ParseUUIDPipe()) userId:string, @Request() req){
        const { sub } = req.user
        return await this.taskService.deleteAssignee(id, userId, sub)

    }



    @UseGuards(JwtAuthGuard)
    @Post('/task/:id/uploadimage/')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload/taskimages/',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + v4();  // <--- replaces whitespaces of uploaded filename and adds uuid to make it unique
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`)

            }
        })
    }))

    async uploadFile(@UploadedFile() file, @Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const {sub} = req.user; 
        console.log(sub)
        return this.taskService.setImage(id, file.filename, sub)
    }


    @Get('/task/image/:imagename')
    async findAvatar(@Param('imagename') imagename, @Response() res): Promise<any> {
        return of(res.sendFile(join(process.cwd(), 'upload/imagenames/' + imagename)))
    }




    @UseGuards(JwtAuthGuard)
    @Delete('/task/:id')
    async deleteTask(@Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const { sub } = req.user
        console.log(sub)
        return await this.taskService.deleteTask(id, sub)
    }





    @UseInterceptors(ClassSerializerInterceptor) //Listens to class validation on user and excludes password on get-request
    @UseGuards(JwtAuthGuard)
    @Get('ownertasks')
    async getOwnerTasks(@Request() req){

        const {sub} = req.user; 
        
        return await this.taskService.getOwnerTasks(sub)
    }
}
