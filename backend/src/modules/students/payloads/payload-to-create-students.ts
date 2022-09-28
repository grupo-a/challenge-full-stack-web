import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { CreateStudents } from '../interfaces/students';

export class PayloadToCreateStudents implements CreateStudents {
  @ApiProperty({ example: 'Matheus Santos' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'msantos@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '49480347890' })
  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf!: string;
}
