import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { Permissions } from './interfaces/permissions';

export class PermissionsRepository {
  constructor(private readonly dao: BaseSqlInterface) {}

  async create(args: Permissions): Promise<string> {
    return this.dao.save(args);
  }

  async update(employeeId: string, args: Permissions): Promise<number> {
    return this.dao.update(employeeId, args);
  }

  async delete(employeeId: string): Promise<number> {
    return this.dao.delete(employeeId);
  }
}
