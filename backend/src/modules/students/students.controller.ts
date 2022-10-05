import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { PayloadToCreateStudents } from './payloads/payload-to-create-students';
import { ListStudents } from './interfaces/students';
import { PayloadToUpdateStudents } from './payloads/payload-to-update-students';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo aluno' })
  async create(
    @Body() payload: PayloadToCreateStudents,
  ): Promise<{ id: string }> {
    return { id: await this.service.create(payload) };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar alunos cadastrados' })
  async list(@Query() query: { limit; page }): Promise<ListStudents[]> {
    return await this.service.list(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtém o cadastro de um aluno' })
  async getById(@Param('id') id: string): Promise<ListStudents> {
    return await this.service.getById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Editar cadastro de aluno' })
  async update(
    @Param('id') id: string,
    @Body() payload: PayloadToUpdateStudents,
  ): Promise<{ message: string }> {
    return {
      message: `${await this.service.update(
        id,
        payload,
      )} cadastro(s) foi(ram) atualizado(s)!`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Excluir cadastro de aluno' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return {
      message: `${await this.service.delete(
        id,
      )} cadastro(s) foi(ram) excluído(s)!`,
    };
  }
}
