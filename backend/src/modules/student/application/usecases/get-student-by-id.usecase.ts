import { IStudentRepository } from "@/modules/student/application/repositories/student.repository";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

export interface GetStudentByIdResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GetStudentByIdUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: string): Promise<GetStudentByIdResponse> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundError("Student not found");
    }

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
      ra: student.ra,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
