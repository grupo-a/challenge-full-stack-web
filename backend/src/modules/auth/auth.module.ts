import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/database.module';
import { EmployeesDao } from '../../providers/database/impl/employees.dao';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { EmployeesSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [DatabaseModule, PermissionsModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useFactory: (repository: AuthRepository) => {
        return new AuthService(repository);
      },
      inject: [AuthRepository],
    },
    {
      provide: AuthRepository,
      useFactory: (dao: EmployeesSqlInterface) => {
        return new AuthRepository(dao);
      },
      inject: [EmployeesDao],
    },
  ],
})
export class AuthModule {}
