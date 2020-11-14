import { EntityRepository, Repository } from 'typeorm';
import Student from '../models/student';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  async list(search?: string) {
    const query = this.createQueryBuilder('student');
    if (search) {
      query
        .where('LOWER(student.name) like :name', {
          name: `%${search.toLowerCase()}%`,
        })
        .orWhere('student.ra like :ra', { ra: `%${search}%` });
    }
    const students = query.getMany();
    return students;
  }
}
