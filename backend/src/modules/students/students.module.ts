import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './students.repository';
import { DatabaseModule } from '../../providers/database/database.module';
import { StudentsDao } from '../../providers/database/impl/students.dao';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController],
  providers: [
    {
      provide: StudentsService,
      useFactory: (repository: StudentsRepository) => {
        return new StudentsService(repository);
      },
      inject: [StudentsRepository],
    },
    {
      provide: StudentsRepository,
      useFactory: (dao: BaseSqlInterface) => {
        return new StudentsRepository(dao);
      },
      inject: [StudentsDao],
    },
  ],
})
export class StudentsModule {}
