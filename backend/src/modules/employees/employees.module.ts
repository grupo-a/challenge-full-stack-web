import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/database.module';
import { EmployeesDao } from '../../providers/database/impl/employees.dao';
import { EmployeesService } from './employees.service';
import { EmployeesRepository } from './employees.repository';
import { EmployeesController } from './employees.controller';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { PermissionsService } from '../permissions/permissions.service';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [DatabaseModule, PermissionsModule],
  controllers: [EmployeesController],
  providers: [
    {
      provide: EmployeesService,
      useFactory: (
        repository: EmployeesRepository,
        permissions: PermissionsService,
      ) => {
        return new EmployeesService(repository, permissions);
      },
      inject: [EmployeesRepository, PermissionsService],
    },
    {
      provide: EmployeesRepository,
      useFactory: (dao: BaseSqlInterface) => {
        return new EmployeesRepository(dao);
      },
      inject: [EmployeesDao],
    },
  ],
})
export class EmployeesModule {}
