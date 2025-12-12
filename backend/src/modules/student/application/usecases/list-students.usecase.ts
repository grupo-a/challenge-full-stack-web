import {
  IStudentRepository,
  ListStudentsFilters,
} from "@/modules/student/application/repositories/student.repository";
import { PaginatedResponse } from "@/common/infrastructure/http/dtos/pagination.dto";

export interface ListStudentsResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ListStudentsUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(
    filters: ListStudentsFilters
  ): Promise<PaginatedResponse<ListStudentsResponse>> {
    const result = await this.studentRepository.list(filters);

    return {
      data: result.data.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        cpf: student.cpf,
        ra: student.ra,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      })),
      meta: result.meta,
    };
  }
}
