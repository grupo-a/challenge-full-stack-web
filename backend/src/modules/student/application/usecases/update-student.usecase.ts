import { IStudentRepository } from "@/modules/student/application/repositories/student.repository";
import { NotFoundError } from "@/common/domain/errors/not-found-error";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";

export interface UpdateStudentDTO {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateStudentResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(dto: UpdateStudentDTO): Promise<UpdateStudentResponse> {
    const student = await this.studentRepository.findById(dto.id);

    if (!student) {
      throw new NotFoundError("Student not found");
    }

    if (dto.email && dto.email !== student.email) {
      const existingEmail = await this.studentRepository.findByEmail(dto.email);

      if (existingEmail) {
        throw new UnprocessableEntityError([
          {
            field: "email",
            message: "Email already in use",
          },
        ]);
      }
    }

    student.update({
      name: dto.name,
      email: dto.email,
    });

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new BadRequestError("Failed to update student");
    }

    return {
      id: updatedStudent.id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      cpf: updatedStudent.cpf,
      ra: updatedStudent.ra,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    };
  }
}
