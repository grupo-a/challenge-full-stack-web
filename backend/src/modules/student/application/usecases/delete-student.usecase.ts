import { IStudentRepository } from "@/modules/student/application/repositories/student.repository";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

export class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(id: string): Promise<void> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundError("Student not found");
    }

    const deleted = await this.studentRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError("Student not found");
    }
  }
}
