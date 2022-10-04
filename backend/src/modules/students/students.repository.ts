import {
  CreateStudents,
  ListStudents,
  UpdateStudents,
} from './interfaces/students';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';

export class StudentsRepository {
  constructor(private readonly dao: BaseSqlInterface) {}

  async create(args: CreateStudents): Promise<string> {
    return this.dao.save(args);
  }

  async list({ limit = 10, page = 1 }): Promise<ListStudents[]> {
    return this.dao.list({ take: limit, skip: (page - 1) * limit });
  }

  async getById(id: string): Promise<ListStudents> {
    return this.dao.getById(id);
  }

  async update(id: string, args: UpdateStudents): Promise<number> {
    return this.dao.update(id, args);
  }

  async delete(id: string): Promise<number> {
    return this.dao.delete(id);
  }
}
