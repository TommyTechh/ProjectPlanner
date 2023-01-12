import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, Request, Response, Patch } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { UserAuthService } from './user_auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import path = require('path')
import { join } from 'path';


@Controller('auth')
export class UserAuthController {

    constructor(private userauthService: UserAuthService) {}

    //Gets all users
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor) //Listens to class validation on user and excludes password on get-request
    @Get()
    async getUsers(){
        return await this.userauthService.getUsers();
    }


    //Creates new user based on class validatio from createUserDto
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto){
        return await this.userauthService.createUser(createUserDto)
    }

    //Gets logged in user based on jwt token
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req){
        const {sub} = req.user;
        console.log(sub)
        return await this.userauthService.getUser(sub)
    }

    //Updates current logged in user
    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateUser(@Body() createUserDto: CreateUserDto, sub: string){
        return await this.userauthService.updateUser(createUserDto, sub)
    }

    //Uploads avatar to user
    @UseGuards(JwtAuthGuard)
    @Post('/:id/avatar/')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload/avatars',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + v4();  // <--- replaces whitespaces of uploaded filename and adds uuid to make it unique
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`)

            }
        })
    }))
    async uploadFile(@UploadedFile() file, @Param('id', new ParseUUIDPipe()) id: string, @Request() req){
        const {sub} = req; //not sure why request opject is undefined, makes auth a problem.
        console.log(sub)
        return this.userauthService.setAvatar(id, file.filename, sub)
    }

    //gets picture from folder
    @Get('/avatar/:avatarname')
    async getAvatar(@Param('avatarname') avatarname, @Response() res): Promise<any> {
        return of(res.sendFile(join(process.cwd(), 'upload/avatars/' + avatarname)))
    }

    //Logs user in and returns jwt token
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return await this.userauthService.loginUser(loginDto)
    }

    //If jwt token has expired it's possbible to use this endpoint to refresh it
    @Post('/refreshtoken')
    async refreshToken(@Body() {refreshToken}: RefreshTokenDto){
        return await this.userauthService.refreshToken(refreshToken);
    }
}


