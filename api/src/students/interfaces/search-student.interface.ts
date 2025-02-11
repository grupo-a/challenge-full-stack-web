import { IPagination } from './../../common/dto/pagination.dto';

export interface IStudentSearchQuery extends IPagination {
  search?: string;
}
