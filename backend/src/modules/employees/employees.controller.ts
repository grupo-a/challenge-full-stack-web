import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { PayloadToCreateEmployees } from './payloads/payload-to-create-employees';
import { ListEmployees } from './interfaces/employees';
import { PayloadToUpdateEmployees } from './payloads/payload-to-update-employees';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar um novo colaborador' })
  async create(
    @Body() payload: PayloadToCreateEmployees,
  ): Promise<{ id: string }> {
    return { id: await this.service.create(payload) };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar colaboradores cadastrados' })
  async list(): Promise<ListEmployees[]> {
    return await this.service.list();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtém o cadastro de um colaborador' })
  async getById(@Param('id') id: string): Promise<ListEmployees> {
    return await this.service.getById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Editar cadastro de colaborador' })
  async update(
    @Param('id') id: string,
    @Body() payload: PayloadToUpdateEmployees,
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
  @ApiOperation({ summary: 'Excluir cadastro de colaborador' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return {
      message: `${await this.service.delete(
        id,
      )} cadastro(s) foi(ram) excluído(s)!`,
    };
  }
}
