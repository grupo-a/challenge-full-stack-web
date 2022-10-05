import { StudentsRepository } from './students.repository';
import {
  CreateStudents,
  ListStudents,
  UpdateStudents,
} from './interfaces/students';

export class StudentsService {
  constructor(private readonly repository: StudentsRepository) {}

  async create(args: CreateStudents): Promise<string> {
    return this.repository.create(args);
  }

  async list(query): Promise<ListStudents[]> {
    return this.repository.list(query);
  }

  async getById(id: string): Promise<ListStudents> {
    return this.repository.getById(id);
  }

  async update(id: string, args: UpdateStudents): Promise<number> {
    return this.repository.update(id, args);
  }

  async delete(id: string): Promise<number> {
    return this.repository.delete(id);
  }
}
