import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './entity/user';

export interface JWTToken{
    token: string,
    refreshToken: string
}

@Injectable()
export class UserAuthService {



    constructor(@InjectRepository(User) private userauthRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService) {}


    
    async getUsers(): Promise<User[]> {
        return this.userauthRepository.find();
    }

    async createUser(userDto: CreateUserDto){
        const userExists = await this.userauthRepository.findOne({where: {username: userDto.username}})
        if(userExists){
            throw new HttpException('Username is taken', 400)
        }

        const hashedPassword = await this.hashPassword(userDto.password);

        await this.userauthRepository.save({
            username: userDto.username,
            password: hashedPassword,
            image: userDto.image
        })
    }

    async loginUser(loginDto: LoginDto){
        const {username, password} = loginDto;
        
        const user = await this.userauthRepository.findOne({where: {username}})
        if(!user){
            throw new HttpException('Username doesn\'t exist', 400)
        }
        const correctPassword = await compare(password, user.password)
        
        if(!correctPassword){
            throw new HttpException('Incorrect Password', 400)
        }

        return this.getJWTToken(user)

    }


    
    async refreshToken(token: string): Promise<JWTToken>{
        try{
            const {sub: username} = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            })
            const user = await this.userauthRepository.findOneOrFail({
                where: {username}
            })

            return this.getJWTToken(user)
        }
        catch(error) {
            throw new HttpException('Invalid login', 400)
        }
    }


    async setAvatar(id: string, avatar:string, userName: string){

        const user = await this.userauthRepository.findOneOrFail({
            where: {id},
        }); //want to compare existing user with req object to auth. For now doesn't work.

        await this.userauthRepository.update({id}, {avatar})
    }

    private hashPassword(password: string): Promise<string>{

        return hash(password, 5)

    }

    private async getJWTToken(user: User): Promise<JWTToken>{
        const[token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.username },
                {secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
                expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRE'),},),
                this.jwtService.signAsync(
                    { sub: user.username },
                    {secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),},),

        ])
        return {token, refreshToken}
    }
    }