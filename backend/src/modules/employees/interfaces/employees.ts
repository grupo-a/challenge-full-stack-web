import { EmployeesInterface } from '../../../models/interfaces/employees.interface';

export type CreateEmployees = Omit<EmployeesInterface, 'id'>;

export type UpdateEmployees = Pick<
  Partial<EmployeesInterface>,
  'name' | 'email' | 'permissions'
>;

export type ListEmployees = EmployeesInterface & {
  createdAt: Date;
  updatedAt: Date;
};
