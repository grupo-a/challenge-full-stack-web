import { describe, it, expect, beforeEach, vi } from "vitest";
import { UpdateStudentUseCase } from "./update-student.usecase";
import { IStudentRepository } from "../repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";
import { NotFoundError } from "@/common/domain/errors/not-found-error";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";

describe("UpdateStudentUseCase", () => {
  let studentRepository: IStudentRepository;
  let updateStudentUseCase: UpdateStudentUseCase;

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
    updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
  });

  it("should update student name successfully", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    const updatedMockStudent = Student.fromPersistence({
      id: "123",
      name: "João Santos",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "update").mockResolvedValue(updatedMockStudent);

    const result = await updateStudentUseCase.execute({
      id: "123",
      name: "João Santos",
    });

    expect(result.name).toBe("João Santos");
    expect(result.email).toBe("joao@example.com");
    expect(studentRepository.findById).toHaveBeenCalledWith("123");
    expect(studentRepository.update).toHaveBeenCalled();
  });

  it("should update student email successfully", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    const updatedMockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao.silva@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "update").mockResolvedValue(updatedMockStudent);

    const result = await updateStudentUseCase.execute({
      id: "123",
      email: "joao.silva@example.com",
    });

    expect(result.email).toBe("joao.silva@example.com");
    expect(result.name).toBe("João Silva");
    expect(studentRepository.findByEmail).toHaveBeenCalledWith(
      "joao.silva@example.com"
    );
  });

  it("should update both name and email", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    const updatedMockStudent = Student.fromPersistence({
      id: "123",
      name: "João Santos",
      email: "joao.santos@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "update").mockResolvedValue(updatedMockStudent);

    const result = await updateStudentUseCase.execute({
      id: "123",
      name: "João Santos",
      email: "joao.santos@example.com",
    });

    expect(result.name).toBe("João Santos");
    expect(result.email).toBe("joao.santos@example.com");
  });

  it("should throw NotFoundError when student does not exist", async () => {
    vi.spyOn(studentRepository, "findById").mockResolvedValue(null);

    await expect(
      updateStudentUseCase.execute({
        id: "non-existent-id",
        name: "New Name",
      })
    ).rejects.toThrow(NotFoundError);
    await expect(
      updateStudentUseCase.execute({
        id: "non-existent-id",
        name: "New Name",
      })
    ).rejects.toThrow("Student not found");
  });

  it("should throw error when email already exists", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    const existingStudent = Student.fromPersistence({
      id: "456",
      name: "Maria Santos",
      email: "maria@example.com",
      cpf: "98765432100",
      ra: 2,
      createdAt: now,
      updatedAt: now,
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(
      existingStudent
    );

    await expect(
      updateStudentUseCase.execute({
        id: "123",
        email: "maria@example.com",
      })
    ).rejects.toThrow(UnprocessableEntityError);

    try {
      await updateStudentUseCase.execute({
        id: "123",
        email: "maria@example.com",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityError);
      if (error instanceof UnprocessableEntityError) {
        expect(error.errors[0]?.field).toBe("email");
        expect(error.errors[0]?.message).toBe("Email already in use");
      }
    }
  });

  it("should allow updating to same email", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    const updatedMockStudent = Student.fromPersistence({
      id: "123",
      name: "João Santos",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: new Date(),
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "update").mockResolvedValue(updatedMockStudent);

    const result = await updateStudentUseCase.execute({
      id: "123",
      name: "João Santos",
      email: "joao@example.com",
    });

    expect(result.name).toBe("João Santos");
    expect(result.email).toBe("joao@example.com");
    expect(studentRepository.findByEmail).not.toHaveBeenCalled();
  });

  it("should throw error when update data is invalid", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);

    await expect(
      updateStudentUseCase.execute({
        id: "123",
        name: "Jo",
      })
    ).rejects.toThrow(UnprocessableEntityError);
  });

  it("should throw error when repository fails to update", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);
    vi.spyOn(studentRepository, "update").mockResolvedValue(null);

    await expect(
      updateStudentUseCase.execute({
        id: "123",
        name: "João Santos",
      })
    ).rejects.toThrow(BadRequestError);
    await expect(
      updateStudentUseCase.execute({
        id: "123",
        name: "João Santos",
      })
    ).rejects.toThrow("Failed to update student");
  });
});
