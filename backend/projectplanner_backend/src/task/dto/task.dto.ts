import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsUUID, IsBoolean, MaxLength, MinLength } from "class-validator";
import { AssigneeDto } from "src/user_auth/dto/assignee.dto";


export class TaskDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    title: string;

    @MaxLength(200)
    @IsString()
    description: string;
    
    @IsArray()
    @ValidateNested()   // Validates the rules in TagsDto, requires below broilerplate code
    @Type(() => TagsDto)
    tags: TagsDto[]


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