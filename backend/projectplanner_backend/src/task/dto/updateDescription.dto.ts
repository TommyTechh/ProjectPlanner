import { IsString } from "class-validator";

export class updateDescriptionDto{
    @IsString()
    description: string
}