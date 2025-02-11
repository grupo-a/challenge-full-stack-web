import { ApiProperty } from '@nestjs/swagger';

export class StudentResponseDto {
  @ApiProperty({
    description: 'Identificador único do estudante',
    example: 'b407a07a-d3af-4b93-9cc1-1815c238217c',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do estudante',
    example: 'João das Neves',
  })
  name: string;

  @ApiProperty({
    description: 'Endereço de email do estudante',
    example: 'joao.das.neves@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de RA (registro acadêmico) do estudante',
    example: '2023123456',
  })
  ra: string;

  @ApiProperty({
    description: 'CPF (Cadastro de Pessoa Física) do estudante',
    example: '06425667982',
  })
  cpf: string;

  @ApiProperty({
    description: 'Data de criação do registro do estudante',
    example: '2025-02-09T17:43:02.266Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro do estudante',
    example: '2025-02-09T17:43:02.266Z',
  })
  updatedAt: Date;
}
