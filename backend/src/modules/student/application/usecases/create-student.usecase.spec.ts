import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateStudentUseCase } from "./create-student.usecase";
import { IStudentRepository } from "../repositories/student.repository";
import { Student } from "@/modules/student/domain/entities/student.entity";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";

describe("CreateStudentUseCase", () => {
  let studentRepository: IStudentRepository;
  let createStudentUseCase: CreateStudentUseCase;

  beforeEach(() => {
    studentRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByCpf: vi.fn(),
      list: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    createStudentUseCase = new CreateStudentUseCase(studentRepository);
  });

  it("should create a student successfully", async () => {
    const dto = {
      name: "João Silva",
      email: "joao@example.com",
      cpf: "123.456.789-09",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "findByCpf").mockResolvedValue(null);
    vi.spyOn(studentRepository, "create").mockResolvedValue(
      Student.fromPersistence({
        id: "123",
        name: dto.name,
        email: dto.email,
        cpf: "12345678909",
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const result = await createStudentUseCase.execute(dto);

    expect(result.name).toBe(dto.name);
    expect(result.email).toBe(dto.email);
    expect(result.cpf).toBe("12345678909");
    expect(result.ra).toBe(1);
    expect(studentRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(studentRepository.findByCpf).toHaveBeenCalledWith("12345678909");
    expect(studentRepository.create).toHaveBeenCalled();
  });

  it("should clean CPF before validation and creation", async () => {
    const dto = {
      name: "João Silva",
      email: "joao@example.com",
      cpf: "123.456.789-09",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "findByCpf").mockResolvedValue(null);
    vi.spyOn(studentRepository, "create").mockResolvedValue(
      Student.fromPersistence({
        id: "123",
        name: dto.name,
        email: dto.email,
        cpf: "12345678909",
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await createStudentUseCase.execute(dto);

    expect(studentRepository.findByCpf).toHaveBeenCalledWith("12345678909");
  });

  it("should throw error when email already exists", async () => {
    const dto = {
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(
      Student.fromPersistence({
        id: "existing-id",
        name: "Existing User",
        email: dto.email,
        cpf: "98765432100",
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await expect(createStudentUseCase.execute(dto)).rejects.toThrow(
      UnprocessableEntityError
    );

    try {
      await createStudentUseCase.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityError);
      if (error instanceof UnprocessableEntityError) {
        expect(error.errors[0]?.field).toBe("email");
        expect(error.errors[0]?.message).toBe("Email already in use");
      }
    }
  });

  it("should throw error when CPF already exists", async () => {
    const dto = {
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "findByCpf").mockResolvedValue(
      Student.fromPersistence({
        id: "existing-id",
        name: "Existing User",
        email: "other@example.com",
        cpf: dto.cpf,
        ra: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await expect(createStudentUseCase.execute(dto)).rejects.toThrow(
      UnprocessableEntityError
    );

    try {
      await createStudentUseCase.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityError);
      if (error instanceof UnprocessableEntityError) {
        expect(error.errors[0]?.field).toBe("cpf");
        expect(error.errors[0]?.message).toBe("CPF already registered");
      }
    }
  });

  it("should throw error when student data is invalid", async () => {
    const dto = {
      name: "Jo",
      email: "invalid-email",
      cpf: "123",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "findByCpf").mockResolvedValue(null);

    await expect(createStudentUseCase.execute(dto)).rejects.toThrow(
      UnprocessableEntityError
    );
  });

  it("should throw error when repository fails to create", async () => {
    const dto = {
      name: "João Silva",
      email: "joao@example.com",
      cpf: "12345678909",
    };

    vi.spyOn(studentRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(studentRepository, "findByCpf").mockResolvedValue(null);
    vi.spyOn(studentRepository, "create").mockResolvedValue(null);

    await expect(createStudentUseCase.execute(dto)).rejects.toThrow(
      BadRequestError
    );
    await expect(createStudentUseCase.execute(dto)).rejects.toThrow(
      "Failed to create student"
    );
  });
});
