import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UpdateStudents } from '../interfaces/students';

export class PayloadToUpdateStudents implements UpdateStudents {
  @ApiProperty({ example: 'Matheus Santos' })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiProperty({ example: 'msantos@gmail.com' })
  @IsEmail()
  @IsOptional()
  email!: string;
}
