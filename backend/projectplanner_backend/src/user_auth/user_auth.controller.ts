import { Body, Controller, Post } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import { UserDto } from './dto/user.dto';
import { UserAuthService } from './user_auth.service';

@Controller('auth')
export class UserAuthController {

    constructor(private userauthService: UserAuthService) {}

    @Post('create')
    async create(@Body() userDto: UserDto){
        return await this.userauthService.createUser(userDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return await this.userauthService.loginUser(loginDto)
    }

    async refreshToken(@Body() {refreshToken}: RefreshTokenDto){
        return await this.userauthService.refreshToken(refreshToken);
    }
}


