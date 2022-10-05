import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
import { Auth } from '../interfaces/auth';

export class PayloadToSignin implements Auth {
  @ApiProperty({ example: 'msantos@gmail.com' })
  @IsString()
  @IsNotEmpty()
  enrolment!: string;

  @ApiProperty({ example: '01GEJ23CSV82QPSRTS254H52A8' })
  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  password!: string;
}
