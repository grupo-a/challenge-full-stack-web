import {
  CreateStudents,
  ListStudents,
} from '../../src/modules/students/interfaces/students';
import { faker } from '@faker-js/faker';
import { MOCK_ID } from './base-mock';

export const STUDENTS: CreateStudents = {
  name: faker.name.fullName(),
  cpf: faker.random.numeric(11),
  email: faker.internet.email(),
};

export const STUDENTS_RETURN_DB: ListStudents = {
  ...STUDENTS,
  id: MOCK_ID,
  ra: faker.datatype.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
};
