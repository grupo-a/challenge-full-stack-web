import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { StudentsDao } from './impl/students.dao';
import { EmployeesDao } from './impl/employees.dao';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { StudentsEntity } from './entities/students.entity';
import { PermissionsDao } from './impl/permissions.dao';
import { PermissionsEntity } from './entities/permissions.entity';
import { EmployeesEntity } from './entities/employees.entity';

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useFactory: async (config: ConfigService) => {
        return await new DataSource({
          type: 'postgres',
          synchronize: true,
          entities: [__dirname + '/entities/*{.js,.ts}'],
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
        }).initialize();
      },
      inject: [ConfigService],
    },
    {
      provide: StudentsDao,
      useFactory: (connection: DataSource) => {
        return new StudentsDao(connection.getRepository(StudentsEntity));
      },
      inject: ['CONNECTION'],
    },
    {
      provide: EmployeesDao,
      useFactory: (connection: DataSource) => {
        return new EmployeesDao(connection.getRepository(EmployeesEntity));
      },
      inject: ['CONNECTION'],
    },
    {
      provide: PermissionsDao,
      useFactory: (connection: DataSource) => {
        return new PermissionsDao(connection.getRepository(PermissionsEntity));
      },
      inject: ['CONNECTION'],
    },
  ],
  exports: [StudentsDao, EmployeesDao, PermissionsDao],
})
export class DatabaseModule {}
