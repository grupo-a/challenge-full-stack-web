import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudantsService } from './studants.service';
import { PayloadToCreateStudents } from './payloads/payload-to-create-students';

@ApiTags('Studants')
@Controller('studants')
export class StudantsController {
  constructor(private readonly service: StudantsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo aluno' })
  async create(
    @Body() payload: PayloadToCreateStudents,
  ): Promise<{ id: string }> {
    return { id: await this.service.create(payload) };
  }
}
