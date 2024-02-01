import { IsNotEmpty, IsEmail } from "class-validator";
import { IsCpfValid } from "../../validators/cpf.validator";

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
    @IsCpfValid({ message: 'Invalid CPF' })
    cpf: string;
}
