import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()    
    email: string;
}
