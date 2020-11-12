import { EntityRepository, Repository } from 'typeorm';
import Student from '../models/student';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {}
