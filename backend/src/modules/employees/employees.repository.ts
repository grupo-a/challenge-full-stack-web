import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { CreateEmployees } from './interfaces/employees';
import { PermissionsService } from '../permissions/permissions.service';
import { Logger } from '@nestjs/common';

export class EmployeesRepository {
  private logger = new Logger(EmployeesRepository.name);

  constructor(
    private readonly dao: BaseSqlInterface,
    private readonly permissions: PermissionsService,
  ) {}

  async create(args: CreateEmployees): Promise<string> {
    return this.dao.save(args).then(async (id) => {
      await this.savePermissions(id, args.permissions).catch((error) => {
        this.logger.warn(
          `permissions for employee of id ${id} not saved: ${error}`,
        );
      });
      return id;
    });
  }

  async savePermissions(employeeId: string, args: string[]) {
    return await this.permissions.create(employeeId, args);
  }
}
