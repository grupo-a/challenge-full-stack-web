import { StudantsRepository } from './studants.repository';
import { CreateStudents } from './interfaces/students';

export class StudantsService {
  constructor(private readonly repository: StudantsRepository) {}

  async create(args: CreateStudents): Promise<string> {
    return this.repository.create(args);
  }
}
