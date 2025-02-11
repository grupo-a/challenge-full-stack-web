import { ApiProperty } from '@nestjs/swagger';
import { StudentResponseDto } from './student-response.dto';

export class PaginatedStudentResponseDto {
  @ApiProperty({
    description: 'Lista de estudantes',
    type: [StudentResponseDto],
  })
  data: StudentResponseDto[];

  @ApiProperty({
    description: 'Total de registros',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Número da página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Número máximo de registros por página',
    example: 10,
  })
  limit: number;
}
