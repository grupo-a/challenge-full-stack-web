import { EmployeesInterface } from '../../../models/interfaces/employees.interface';

export type CreateEmployees = Omit<EmployeesInterface, 'id' | 'enrolment'>;
