import { StudantsRepository } from './studants.repository';
import {
  CreateStudents,
  ListStudents,
  UpdateStudents,
} from './interfaces/students';

export class StudantsService {
  constructor(private readonly repository: StudantsRepository) {}

  async create(args: CreateStudents): Promise<string> {
    return this.repository.create(args);
  }

  async list(query): Promise<ListStudents[]> {
    return this.repository.list(query);
  }

  async update(id: string, args: UpdateStudents): Promise<number> {
    return this.repository.update(id, args);
  }

  async delete(id: string): Promise<number> {
    return this.repository.delete(id);
  }
}
