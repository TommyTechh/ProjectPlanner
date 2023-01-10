import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { UserAuthService } from './user_auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class UserAuthController {

    constructor(private userauthService: UserAuthService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor) //Listens to class validation on user and excludes password on get-request
    @Get()
    async getUsers(){
        return await this.userauthService.getUsers();
    }


    @Post('create')
    async create(@Body() createUserDto: CreateUserDto){
        return await this.userauthService.createUser(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('/:id/avatar')
    async uploadAvatar(
        @UploadedFile()
        file: Express.Multer.File,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Request() req
    ){
        const { sub: username } = req;
        await this.userauthService.uploadAvatar(file, id, username)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return await this.userauthService.loginUser(loginDto)
    }

    @Post('/refreshtoken')
    async refreshToken(@Body() {refreshToken}: RefreshTokenDto){
        return await this.userauthService.refreshToken(refreshToken);
    }
}


