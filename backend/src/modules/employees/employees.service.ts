import { EmployeesRepository } from './employees.repository';
import { CreateEmployees } from './interfaces/employees';

export class EmployeesService {
  constructor(private readonly repository: EmployeesRepository) {}

  async create(args: CreateEmployees): Promise<string> {
    return this.repository.create(args);
  }
}
