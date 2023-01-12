import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string
    @IsString()
    avatar: string;
}