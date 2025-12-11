import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetStudentByIdUseCase } from "./get-student-by-id.usecase";
import { IStudentRepository } from "../repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";
import { NotFoundError } from "@/common/domain/errors/not-found-error";

describe("GetStudentByIdUseCase", () => {
  let studentRepository: IStudentRepository;
  let getStudentByIdUseCase: GetStudentByIdUseCase;

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
    getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepository);
  });

  it("should get student by id successfully", async () => {
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

    const result = await getStudentByIdUseCase.execute("123");

    expect(result).toEqual({
      id: "123",
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
      ra: 1,
      createdAt: now,
      updatedAt: now,
    });
    expect(studentRepository.findById).toHaveBeenCalledWith("123");
  });

  it("should throw NotFoundError when student does not exist", async () => {
    vi.spyOn(studentRepository, "findById").mockResolvedValue(null);

    await expect(
      getStudentByIdUseCase.execute("non-existent-id")
    ).rejects.toThrow(NotFoundError);
    await expect(
      getStudentByIdUseCase.execute("non-existent-id")
    ).rejects.toThrow("Student not found");
  });

  it("should return all student fields", async () => {
    const createdAt = new Date("2024-01-01");
    const updatedAt = new Date("2024-01-02");
    const mockStudent = Student.fromPersistence({
      id: "test-id",
      name: "Test Student",
      email: "test@example.com",
      cpf: "98765432100",
      ra: 999,
      createdAt,
      updatedAt,
    });

    vi.spyOn(studentRepository, "findById").mockResolvedValue(mockStudent);

    const result = await getStudentByIdUseCase.execute("test-id");

    expect(result.id).toBe("test-id");
    expect(result.name).toBe("Test Student");
    expect(result.email).toBe("test@example.com");
    expect(result.cpf).toBe("98765432100");
    expect(result.ra).toBe(999);
    expect(result.createdAt).toBe(createdAt);
    expect(result.updatedAt).toBe(updatedAt);
  });
});
