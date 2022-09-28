import { CreateStudents } from '../../src/modules/students/interfaces/students';
import { faker } from '@faker-js/faker';

export const STUDENTS: CreateStudents = {
  name: faker.name.fullName(),
  cpf: faker.random.numeric(11),
  email: faker.internet.email(),
};
