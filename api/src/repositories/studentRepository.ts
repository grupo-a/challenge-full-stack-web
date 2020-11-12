import { EntityRepository, Repository } from 'typeorm';
import Student from '../models/student';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  async list(name?: string) {
    const query = this.createQueryBuilder('student');
    if (name) {
      query.where('LOWER(student.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const students = query.getMany();

    return students;
  }
}
