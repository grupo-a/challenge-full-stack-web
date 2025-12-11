import { IStudentRepository } from "@/modules/student/application/repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";

export interface CreateStudentDTO {
  name: string;
  email: string;
  cpf: string;
}

export interface CreateStudentResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async execute(dto: CreateStudentDTO): Promise<CreateStudentResponse> {
    const cleanCPF = dto.cpf.replace(/\D/g, "");

    const existingEmail = await this.studentRepository.findByEmail(dto.email);

    if (existingEmail) {
      throw new UnprocessableEntityError([
        {
          field: "email",
          message: "Email already in use",
        },
      ]);
    }

    const existingCPF = await this.studentRepository.findByCpf(cleanCPF);

    if (existingCPF) {
      throw new UnprocessableEntityError([
        {
          field: "cpf",
          message: "CPF already registered",
        },
      ]);
    }

    const student = Student.create({
      name: dto.name,
      email: dto.email,
      cpf: cleanCPF,
    });

    const createdStudent = await this.studentRepository.create(student);

    if (!createdStudent) {
      throw new BadRequestError("Failed to create student");
    }

    return {
      id: createdStudent.id,
      name: createdStudent.name,
      email: createdStudent.email,
      cpf: createdStudent.cpf,
      ra: createdStudent.ra,
      createdAt: createdStudent.createdAt,
      updatedAt: createdStudent.updatedAt,
    };
  }
}
