import { EmployeesRepository } from './employees.repository';
import {
  CreateEmployees,
  ListEmployees,
  UpdateEmployees,
} from './interfaces/employees';
import { PermissionsService } from '../permissions/permissions.service';
import { Logger } from '@nestjs/common';

export class EmployeesService {
  private logger = new Logger(EmployeesService.name);

  constructor(
    private readonly repository: EmployeesRepository,
    private readonly permissions: PermissionsService,
  ) {}

  async create(args: CreateEmployees): Promise<string> {
    return this.repository.create(args).then(async (id) => {
      await this.permissions.create(id, args.permissions).catch((error) => {
        this.logger.warn(
          `Permissions for employee of id ${id} not saved: ${error}`,
        );
      });
      return id;
    });
  }

  async list(): Promise<ListEmployees[]> {
    return this.repository.list();
  }

  async getById(id: string): Promise<ListEmployees> {
    return this.repository.getById(id);
  }

  async update(id: string, args: UpdateEmployees): Promise<number> {
    return this.repository
      .update(id, { ...args, permissions: undefined })
      .then(async (matchCount: number) => {
        if (args.permissions && args.permissions.length > 0) {
          await this.permissions.update(id, args.permissions).catch((error) => {
            this.logger.warn(
              `Permissions for employee of id ${id} not update: ${error}`,
            );
          });
        }
        return matchCount;
      });
  }

  async delete(id: string): Promise<number> {
    return this.permissions.delete(id).then(async (matchCount: number) => {
      await this.repository.delete(id);
      return matchCount;
    });
  }
}
