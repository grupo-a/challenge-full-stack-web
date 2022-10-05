import { EmployeesInterface } from '../../../models/interfaces/employees.interface';

export type Auth = Pick<EmployeesInterface, 'enrolment' | 'password'>;

export type AuthReturn = Pick<
  EmployeesInterface,
  'enrolment' | 'password' | 'id'
>;
