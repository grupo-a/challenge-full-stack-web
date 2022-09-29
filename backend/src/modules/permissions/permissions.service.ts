import { PermissionsRepository } from './permissions.repository';
import { CreatePermissions } from './interfaces/permissions';

export class PermissionsService {
  constructor(private readonly repository: PermissionsRepository) {}

  async create(employeeId: string, args: string[]): Promise<string> {
    const permissions = this.buildPermissions(employeeId, args);
    return this.repository.create(permissions);
  }

  buildPermissions(employeeId: string, args: string[]): CreatePermissions {
    return {
      employeeId,
      read: args.includes('READ'),
      create: args.includes('CREATE'),
      update: args.includes('UPDATE'),
      delete: args.includes('DELETE'),
    };
  }
}
