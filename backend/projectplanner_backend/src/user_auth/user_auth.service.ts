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


    // finds all users in user database
    async getUsers(): Promise<User[]> {
        return this.userauthRepository.find();
    }

    //gets user based on userid
    async getUser(userId: string): Promise<User> {
        return this.userauthRepository.findOneOrFail({where: {userId}});
    }

    //creates user and hashes password
    async createUser(userDto: CreateUserDto){

        const userExists = await this.userauthRepository.findOne({where: {username: userDto.username}})
        if(userExists){
            throw new HttpException('Username is taken', 400)
        }

        const hashedPassword = await this.hashPassword(userDto.password);

        await this.userauthRepository.save({
            username: userDto.username,
            password: hashedPassword
        })
    }

    //Loggs in user and returns jwt token
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

    //updates user
    async updateUser(createUserDto: CreateUserDto, sub: string){
        await this.userauthRepository.update(sub, {...createUserDto});
    }


    //verifies jwt token and allows the user to get a refreshed token
    async refreshToken(token: string): Promise<JWTToken>{
        try{
            const {sub: userId} = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            })
            const user = await this.userauthRepository.findOneOrFail({
                where: {userId}
            })

            return this.getJWTToken(user)
        }
        catch(error) {
            throw new HttpException('Invalid login', 400)
        }
    }


    //Sets avatar to the user
    async setAvatar(userId: string, avatar:string, sub: string){

        const user = await this.userauthRepository.findOneOrFail({
            where: {userId},
        }); //want to compare existing user with req object to auth. For now doesn't work.

        if (user.userId !== sub){
            throw new HttpException(
                "Invalid", 400
            )
        }

        await this.userauthRepository.update({userId}, {avatar})
    }
    //method to hash password, saltrounds is set to 12 but c
    private hashPassword(password: string): Promise<string>{
        return hash(password, 12)
    }

    //Gets JWT token and refreshtoken 
    private async getJWTToken(user: User): Promise<JWTToken>{
        const[token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.userId },
                {secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
                expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRE'),},),
                this.jwtService.signAsync(
                    { sub: user.userId},
                    {secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),},),

        ])
        return {token, refreshToken}
    }
    }