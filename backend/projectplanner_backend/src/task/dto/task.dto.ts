import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { UserDto } from "src/user_auth/dto/user.dto";

export class TaskDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    image: string;
    @IsArray()
    @ValidateNested()   // Validates the rules in TagsDto, requires below broilerplate code
    @Type(() => TagsDto)
    tags: TagsDto[]

    status: boolean;

    Owner: UserDto;
   
    @IsArray()
    assignees: UserDto[];
}


export class TagsDto{
    @IsNotEmpty()
    @IsString()
    name: string;

}