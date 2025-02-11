import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsCpfValid } from 'src/common/decorators/cpf-validator.decorator';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'Nome completo do estudante',
    example: 'João das Neves',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Endereço de e-mail do estudante',
    example: 'joao.das.neves@email.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'CPF do estudante (somente números)',
    example: '12345678901',
  })
  @IsOptional()
  @IsString()
  @IsCpfValid({ message: 'CPF inválido' })
  cpf?: string;
}
