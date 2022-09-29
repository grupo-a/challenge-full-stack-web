import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database/database.module';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './permissions.repository';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';
import { PermissionsDao } from '../../providers/database/impl/permissions.dao';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: PermissionsService,
      useFactory: (repository: PermissionsRepository) => {
        return new PermissionsService(repository);
      },
      inject: [PermissionsRepository],
    },
    {
      provide: PermissionsRepository,
      useFactory: (dao: BaseSqlInterface) => {
        return new PermissionsRepository(dao);
      },
      inject: [PermissionsDao],
    },
  ],
  exports: [PermissionsService],
})
export class PermissionsModule {}
