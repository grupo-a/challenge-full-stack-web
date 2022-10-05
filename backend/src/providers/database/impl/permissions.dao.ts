import { BaseSql } from '../base/base.sql';
import { PermissionsEntity } from '../entities/permissions.entity';
import { ERRORS_DESCRIPTION } from '../../../common/errors/errors.enum';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class PermissionsDao extends BaseSql<PermissionsEntity> {
  override async getById(id: string): Promise<PermissionsEntity> {
    return await this.typeorm
      .createQueryBuilder('permissions')
      .leftJoinAndSelect('permissions.employeeId', 'employeeId')
      .where({ employeeId: id })
      .getOne()
      .catch(() => {
        throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      });
  }

  override async update(
    employeeId: string,
    args: QueryDeepPartialEntity<PermissionsEntity>,
  ): Promise<number> {
    return await this.typeorm.update({ employeeId }, args).then((result) => {
      if (result.affected <= 0) throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      return result.affected;
    });
  }

  override async delete(employeeId: string): Promise<number> {
    return await this.typeorm.delete({ employeeId }).then((result) => {
      if (result.affected <= 0) throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      return result.affected;
    });
  }
}
