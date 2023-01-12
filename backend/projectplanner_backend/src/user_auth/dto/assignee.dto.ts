import { IsNotEmpty, IsString } from "class-validator";

export class AssigneeDto{
    
    @IsString()
    id: string;
}