import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsUUID, IsBoolean, MaxLength, MinLength, IsOptional } from "class-validator";
import { AssigneeDto } from "../../user_auth/dto/assignee.dto";
import { TagsDto } from "./tag.dto";

export class TaskDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    title: string;

    @MaxLength(200)
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}