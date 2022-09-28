import { CreatePermissions } from '../../src/modules/permissions/interfaces/permissions';
import { faker } from '@faker-js/faker';

export const PERMISSIONS_LIST = ['READ'];

export const PERMISSIONS: CreatePermissions = {
  employeeId: faker.datatype.uuid(),
  read: faker.datatype.boolean(),
  create: faker.datatype.boolean(),
  update: faker.datatype.boolean(),
  delete: faker.datatype.boolean(),
};
