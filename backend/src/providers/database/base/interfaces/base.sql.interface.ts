import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseSqlInterface<T = any> {
  save(args: DeepPartial<T>): Promise<string>;
  list(options?: FindManyOptions<T>): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, args: QueryDeepPartialEntity<T>): Promise<number>;
  delete(id: string): Promise<number>;
}

export interface EmployeesSqlInterface<T = any> extends BaseSqlInterface {
  getByEnrolment(enrolment: string): Promise<T>;
}
