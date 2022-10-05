import { PermissionsRepository } from './permissions.repository';
import { ListPermissions, Permissions } from './interfaces/permissions';

export class PermissionsService {
  constructor(private readonly repository: PermissionsRepository) {}

  async getByEmployeeId(employeeId: string): Promise<ListPermissions> {
    return this.repository.getByEmployeeId(employeeId);
  }

  async create(employeeId: string, args: string[]): Promise<string> {
    const permissions = this.buildPermissions(employeeId, args);
    return this.repository.create(permissions);
  }

  async update(employeeId: string, args: string[]): Promise<number> {
    const permissions = this.buildPermissions(employeeId, args);
    return this.repository.update(employeeId, permissions);
  }

  protected buildPermissions(employeeId: string, args: string[]): Permissions {
    return {
      employeeId,
      read: args.includes('READ'),
      create: args.includes('CREATE'),
      update: args.includes('UPDATE'),
      delete: args.includes('DELETE'),
    };
  }

  async delete(employeeId: string): Promise<number> {
    return this.repository.delete(employeeId);
  }
}
