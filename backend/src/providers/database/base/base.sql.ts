import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Repository } from 'typeorm';
import { ERRORS_DESCRIPTION } from '../../../common/errors/errors.enum';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { BaseSqlInterface } from './interfaces/base.sql.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export abstract class BaseSql<T> implements BaseSqlInterface {
  private static CONFLICT_ERROR = 'duplicate key';

  constructor(protected readonly typeorm: Repository<T>) {}

  async save(args: DeepPartial<T>): Promise<string> {
    const data = this.typeorm.create(args);
    return await this.typeorm
      .save(data)
      .then((result) => result['id'])
      .catch((error) => {
        throw new Error(
          error.message.includes(BaseSql.CONFLICT_ERROR)
            ? ERRORS_DESCRIPTION.ALREADY_EXIST
            : ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async list(options: FindManyOptions<T>): Promise<T[]> {
    return await this.typeorm.find(options).catch(() => {
      throw new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR);
    });
  }

  async getById(id: string): Promise<T> {
    return await this.typeorm
      .findOneOrFail({ where: { id } as unknown as FindOptionsWhere<T> })
      .catch(() => {
        throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      });
  }

  async update(id: string, args: QueryDeepPartialEntity<T>): Promise<number> {
    return await this.typeorm.update(id, args).then((result) => {
      if (result.affected <= 0) throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      return result.affected;
    });
  }

  async delete(id: string): Promise<number> {
    return await this.typeorm.delete(id).then((result) => {
      if (result.affected <= 0) throw new Error(ERRORS_DESCRIPTION.NOT_FOUND);
      return result.affected;
    });
  }
}
