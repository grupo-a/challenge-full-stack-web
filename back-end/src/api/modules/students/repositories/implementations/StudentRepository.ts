import { Student } from "@prisma/client";
import IStudentDTO from "../DTOs/IStudentDTO";
import IStudentRepository from "../interfaces/IStudentRepository";
import prismaClient from "../../../../../prismaClient";

export default class StudentRepository implements IStudentRepository {
  async create({ name, email, ra, cpf }: IStudentDTO): Promise<void> {
    await prismaClient.student.create({
      data: {
        name,
        email,
        ra,
        cpf
      }
    });
  }

  async findByRa(ra: string): Promise<Student> {
    const student = await prismaClient.student.findFirst({
      where: {
        ra,
      },
    });
    return student as Student;
  }

  async list(): Promise<Student[]> {
    const students = await prismaClient.student.findMany();
    return students as Student[];
  }

  async update({ name, email, ra }: IStudentDTO): Promise<void> {
    await prismaClient.student.update({
      where: {
        ra
      },
      data: {
        name,
        email
      },
    });
  };
  
  async destroy(ra: string): Promise<void> {
    await prismaClient.student.delete({
      where: {
        ra,
      },
    });
  };
  
}