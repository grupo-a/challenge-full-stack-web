import { IsString, IsEmail, MaxLength } from 'class-validator';
import { IsCpfValid } from '../../common/decorators/cpf-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Nome completo do estudante',
    example: 'João das Neves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail do estudante',
    example: 'joao.das.neves@email.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'CPF do estudante (somente números)',
    example: '12345678901',
  })
  @IsString()
  @IsCpfValid({ message: 'CPF inválido' })
  cpf: string;

  @ApiProperty({
    description: 'RA do estudante',
    example: '2023123456',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  ra: string;
}
