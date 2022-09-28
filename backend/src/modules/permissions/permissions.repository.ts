import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { CreatePermissions } from './interfaces/permissions';

export class PermissionsRepository {
  constructor(private readonly dao: BaseSqlInterface) {}

  async create(args: CreatePermissions): Promise<string> {
    return this.dao.save(args);
  }
}
