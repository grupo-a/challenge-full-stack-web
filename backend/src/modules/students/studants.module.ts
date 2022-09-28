import { Module } from '@nestjs/common';
import { StudantsController } from './studants.controller';
import { StudantsService } from './studants.service';
import { StudantsRepository } from './studants.repository';
import { DatabaseModule } from '../../providers/database/database.module';
import { StudentsDao } from '../../providers/database/impl/students.dao';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [StudantsController],
  providers: [
    {
      provide: StudantsService,
      useFactory: (repository: StudantsRepository) => {
        return new StudantsService(repository);
      },
      inject: [StudantsRepository],
    },
    {
      provide: StudantsRepository,
      useFactory: (dao: BaseSqlInterface) => {
        return new StudantsRepository(dao);
      },
      inject: [StudentsDao],
    },
  ],
})
export class StudantsModule {}
