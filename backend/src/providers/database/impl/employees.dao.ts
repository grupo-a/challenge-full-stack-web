import { BaseSql } from '../base/base.sql';
import { EmployeesEntity } from '../entities/employees.entity';
import { EmployeesSqlInterface } from '../base/interfaces/base.sql.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ERRORS_DESCRIPTION } from '../../../common/errors/errors.enum';

export class EmployeesDao
  extends BaseSql<EmployeesEntity>
  implements EmployeesSqlInterface
{
  async getByEnrolment(enrolment: string): Promise<EmployeesEntity> {
    return await this.typeorm
      .findOneOrFail({
        where: { enrolment } as unknown as FindOptionsWhere<EmployeesEntity>,
      })
      .catch(() => {
        throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      });
  }
}
