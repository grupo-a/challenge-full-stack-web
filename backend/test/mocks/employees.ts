import { faker } from '@faker-js/faker';
import {
  CreateEmployees,
  ListEmployees,
} from '../../src/modules/employees/interfaces/employees';
import { PERMISSIONS_LIST } from './permissions';
import { MOCK_ID } from './base-mock';

export const EMPLOYEES: CreateEmployees = {
  name: faker.name.fullName(),
  cpf: faker.random.numeric(11),
  email: faker.internet.email(),
  permissions: PERMISSIONS_LIST,
  password: faker.internet.password(),
  enrolment: faker.datatype.uuid(),
};

export const EMPLOYEES_RETURN_DB: ListEmployees = {
  ...EMPLOYEES,
  id: MOCK_ID,
  enrolment: faker.datatype.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
};
