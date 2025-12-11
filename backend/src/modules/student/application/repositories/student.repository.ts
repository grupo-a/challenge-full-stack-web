import { Student } from "@/modules/student/domain/entities/student.entity";
import {
  PaginatedResponse,
  PaginationDTO,
} from "@/common/infrastructure/http/dtos/pagination.dto";

export interface ListStudentsFilters extends PaginationDTO {
  name?: string;
  email?: string;
  ra?: number;
}

export interface IStudentRepository {
  create(student: Student): Promise<Student | null>;
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  findByCpf(cpf: string): Promise<Student | null>;
  findByRa(ra: number): Promise<Student | null>;
  list(filters: ListStudentsFilters): Promise<PaginatedResponse<Student>>;
  update(student: Student): Promise<Student | null>;
  delete(id: string): Promise<boolean>;
}
