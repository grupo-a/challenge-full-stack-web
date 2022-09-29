import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { UpdateEmployees } from '../interfaces/employees';

export class PayloadToUpdateEmployees implements UpdateEmployees {
  @ApiProperty({ example: 'Matheus Santos' })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiProperty({ example: 'msantos@gmail.com' })
  @IsEmail()
  @IsOptional()
  email!: string;

  @ApiProperty({ example: ['READ', 'UPDATE', 'DELETE', 'CREATE'] })
  @IsIn(['READ', 'UPDATE', 'DELETE', 'CREATE'], { each: true })
  @IsOptional()
  permissions: string[];
}
