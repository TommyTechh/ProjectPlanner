import { Body, ClassSerializerInterceptor, Controller, Get, ParseUUIDPipe, Post, ValidationPipe, Response } from '@nestjs/common';
import { Delete, Param, Patch, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path')
import { of } from 'rxjs';
import { UserDto } from 'src/user_auth/dto/user.dto';
import { JwtAuthGuard } from 'src/user_auth/guard/jwt-auth.guard';
import { v4 } from 'uuid';
import { TaskDto } from './dto/task.dto';
import { updateDescriptionDto } from './dto/updateDescription.dto';
import { TaskService } from './task.service';

@Controller('task')
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
    @Get('/:id')
    async getTask(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.taskService.getTask(id);

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTask(@Body() taskDto: TaskDto, @Request() req) {
        const { sub } = req.user;
        return await this.taskService.createTask(taskDto, sub);

    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateDescription(@Body() {description}: updateDescriptionDto, @Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const { sub } = req.user
        return await this.taskService.updateDesription(id, description, sub)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:id/uploadimage/')
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
        const {sub} = req; 
        console.log(sub)
        return this.taskService.setImage(id, file.filename)
    }


    @Get('/image/:imagename')
    async findAvatar(@Param('imagename') imagename, @Response() res): Promise<any> {
        return of(res.sendFile(join(process.cwd(), 'upload/imagenames/' + imagename)))
    }




    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteTask(@Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const { sub } = req.user
        return await this.taskService.deleteTask(id, sub)
    }
}
