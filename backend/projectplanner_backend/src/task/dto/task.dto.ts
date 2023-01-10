import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsUUID, IsBoolean, MaxLength, MinLength } from "class-validator";
import { AssigneeDto } from "src/user_auth/dto/assignee.dto";
import { UserDto } from "src/user_auth/dto/user.dto";
import { Unique } from "typeorm";

export class TaskDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    title: string;

    @MaxLength(200)
    @IsString()
    description: string;

    image: string;
    @IsArray()
    @ValidateNested()   // Validates the rules in TagsDto, requires below broilerplate code
    @Type(() => TagsDto)
    tags: TagsDto[]

    @IsBoolean()
    status: boolean;


    @IsArray()
    @ValidateNested()   // Validates the rules in TagsDto, requires below broilerplate code
    @Type(() => AssigneeDto)
    assignees: AssigneeDto[];
}


export class TagsDto{
    @IsNotEmpty()
    @IsString()
    name: string;

}