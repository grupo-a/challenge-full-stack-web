import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import {
  CreateEmployees,
  ListEmployees,
  UpdateEmployees,
} from './interfaces/employees';

export class EmployeesRepository {
  constructor(private readonly dao: BaseSqlInterface) {}

  async create(args: CreateEmployees): Promise<string> {
    return this.dao.save(args);
  }

  async list(): Promise<ListEmployees[]> {
    return this.dao.list();
  }

  async getById(id: string): Promise<ListEmployees> {
    return this.dao.getById(id);
  }

  async update(id: string, args: UpdateEmployees): Promise<number> {
    return this.dao.update(id, args);
  }

  async delete(id: string): Promise<number> {
    return this.dao.delete(id);
  }
}
