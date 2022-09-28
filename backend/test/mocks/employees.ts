import { faker } from '@faker-js/faker';
import { CreateEmployees } from '../../src/modules/employees/interfaces/employees';
import { PERMISSIONS_LIST } from './permissions';

export const EMPLOYEES: CreateEmployees = {
  name: faker.name.fullName(),
  cpf: faker.random.numeric(11),
  email: faker.internet.email(),
  permissions: PERMISSIONS_LIST,
};
