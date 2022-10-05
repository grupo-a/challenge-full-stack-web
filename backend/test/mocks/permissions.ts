import {
  ListPermissions,
  Permissions,
} from '../../src/modules/permissions/interfaces/permissions';
import { faker } from '@faker-js/faker';
import { MOCK_ID } from './base-mock';

export const PERMISSIONS_LIST = ['READ'];

export const PERMISSIONS: Permissions = {
  employeeId: faker.datatype.uuid(),
  read: faker.datatype.boolean(),
  create: faker.datatype.boolean(),
  update: faker.datatype.boolean(),
  delete: faker.datatype.boolean(),
};

export const PERMISSIONS_DB: ListPermissions = {
  ...PERMISSIONS,
  id: MOCK_ID,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
};
