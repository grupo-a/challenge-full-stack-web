import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsISO8601()
  @IsNotEmpty()
  readonly birthDate: Date;
}
