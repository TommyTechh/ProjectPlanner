
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsUUID, IsBoolean, MaxLength, MinLength, IsOptional } from "class-validator";
export class TagsDto{
    
    
    @IsString()
    name: string;
}