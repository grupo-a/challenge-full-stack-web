import { IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    username?: string;

    @IsString()
    password?: string;

    @IsString()
    user_type?: string;
}