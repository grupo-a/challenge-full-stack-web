import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CreateEmployees } from '../interfaces/employees';

export class PayloadToCreateEmployees implements CreateEmployees {
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

  @ApiProperty({ example: '01GEJBFFA537B5YMW2P04BCFQH' })
  @IsString()
  @IsOptional()
  enrolment!: string;

  @ApiProperty({ example: ['READ', 'UPDATE', 'DELETE', 'CREATE'] })
  @IsIn(['READ', 'UPDATE', 'DELETE', 'CREATE'], { each: true })
  @IsNotEmpty()
  permissions: string[];

  @ApiProperty({ example: '49480347890' })
  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  password!: string;
}
