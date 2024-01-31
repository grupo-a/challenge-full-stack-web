import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()    
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    ra: string;

    @IsNotEmpty()
    cpf: string;
}
