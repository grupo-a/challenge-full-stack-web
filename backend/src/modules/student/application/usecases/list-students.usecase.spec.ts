import { describe, it, expect, beforeEach, vi } from "vitest";
import { ListStudentsUseCase } from "./list-students.usecase";
import { IStudentRepository } from "../repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";

describe("ListStudentsUseCase", () => {
  let studentRepository: IStudentRepository;
  let listStudentsUseCase: ListStudentsUseCase;

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
    listStudentsUseCase = new ListStudentsUseCase(studentRepository);
  });

  it("should list students with pagination", async () => {
    const mockStudents = [
      Student.fromPersistence({
        id: "1",
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Student.fromPersistence({
        id: "2",
        name: "Maria Santos",
        email: "maria@example.com",
        cpf: "98765432100",
        ra: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    vi.spyOn(studentRepository, "list").mockResolvedValue({
      data: mockStudents,
      meta: {
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    });

    const result = await listStudentsUseCase.execute({
      page: 1,
      limit: 10,
    });

    expect(result.data).toHaveLength(2);
    expect(result.data[0]?.name).toBe("João Silva");
    expect(result.data[1]?.name).toBe("Maria Santos");
    expect(result.meta.total).toBe(2);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.totalPages).toBe(1);
  });

  it("should list students with search filter", async () => {
    const mockStudents = [
      Student.fromPersistence({
        id: "1",
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    vi.spyOn(studentRepository, "list").mockResolvedValue({
      data: mockStudents,
      meta: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    });

    const result = await listStudentsUseCase.execute({
      page: 1,
      limit: 10,
      search: "João",
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.name).toBe("João Silva");
    expect(studentRepository.list).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      search: "João",
    });
  });

  it("should return empty list when no students found", async () => {
    vi.spyOn(studentRepository, "list").mockResolvedValue({
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    });

    const result = await listStudentsUseCase.execute({
      page: 1,
      limit: 10,
    });

    expect(result.data).toHaveLength(0);
    expect(result.meta.total).toBe(0);
    expect(result.meta.totalPages).toBe(0);
  });

  it("should handle pagination correctly", async () => {
    const mockStudents = [
      Student.fromPersistence({
        id: "11",
        name: "Student 11",
        email: "student11@example.com",
        cpf: "11111111111",
        ra: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    vi.spyOn(studentRepository, "list").mockResolvedValue({
      data: mockStudents,
      meta: {
        total: 25,
        page: 2,
        limit: 10,
        totalPages: 3,
      },
    });

    const result = await listStudentsUseCase.execute({
      page: 2,
      limit: 10,
    });

    expect(result.meta.page).toBe(2);
    expect(result.meta.totalPages).toBe(3);
    expect(studentRepository.list).toHaveBeenCalledWith({
      page: 2,
      limit: 10,
    });
  });

  it("should return all student fields correctly", async () => {
    const now = new Date();
    const mockStudent = Student.fromPersistence({
      id: "123",
      name: "Test Student",
      email: "test@example.com",
      cpf: "12345678909",
      ra: 100,
      createdAt: now,
      updatedAt: now,
    });

    vi.spyOn(studentRepository, "list").mockResolvedValue({
      data: [mockStudent],
      meta: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    });

    const result = await listStudentsUseCase.execute({
      page: 1,
      limit: 10,
    });

    expect(result.data[0]).toEqual({
      id: "123",
      name: "Test Student",
      email: "test@example.com",
      cpf: "12345678909",
      ra: 100,
      createdAt: now,
      updatedAt: now,
    });
  });
});
