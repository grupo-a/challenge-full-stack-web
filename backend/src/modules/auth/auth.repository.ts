import { EmployeesSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { AuthReturn } from './interfaces/auth';

export class AuthRepository {
  constructor(private readonly dao: EmployeesSqlInterface) {}

  async getByEnrolment(id: string): Promise<AuthReturn> {
    return this.dao.getByEnrolment(id);
  }
}
