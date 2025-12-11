import { describe, it, expect, beforeEach, vi } from "vitest";
import { DeleteStudentUseCase } from "./delete-student.usecase";
import { IStudentRepository } from "../repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

describe("DeleteStudentUseCase", () => {
  let studentRepository: IStudentRepository;
  let deleteStudentUseCase: DeleteStudentUseCase;

  beforeEach(() => {
    studentRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByCpf: vi.fn(),
      findByRa: vi.fn(),
      list: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
  });

  it("should delete student successfully", async () => {
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "delete").mockResolvedValue(true);

    await deleteStudentUseCase.execute("123");

    expect(studentRepository.findById).toHaveBeenCalledWith("123");
    expect(studentRepository.delete).toHaveBeenCalledWith("123");
  });

  it("should throw NotFoundError when student does not exist", async () => {
    vi.spyOn(studentRepository, "findById").mockResolvedValue(null);

    await expect(
      deleteStudentUseCase.execute("non-existent-id")
    ).rejects.toThrow(NotFoundError);
    await expect(
      deleteStudentUseCase.execute("non-existent-id")
    ).rejects.toThrow("Student not found");
  });

  it("should throw NotFoundError when repository delete returns false", async () => {
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "delete").mockResolvedValue(false);

    await expect(deleteStudentUseCase.execute("123")).rejects.toThrow(
      NotFoundError
    );
    await expect(deleteStudentUseCase.execute("123")).rejects.toThrow(
      "Student not found"
    );
  });

  it("should call repository methods in correct order", async () => {
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const findByIdSpy = vi
      .spyOn(studentRepository, "findById")
      .mockResolvedValue(mockStudent);
    const deleteSpy = vi
      .spyOn(studentRepository, "delete")
      .mockResolvedValue(true);

    await deleteStudentUseCase.execute("123");

    expect(findByIdSpy).toHaveBeenCalledBefore(deleteSpy);
  });
});
