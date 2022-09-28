import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { PayloadToCreateEmployees } from './payloads/payload-to-create-employees';

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
}
