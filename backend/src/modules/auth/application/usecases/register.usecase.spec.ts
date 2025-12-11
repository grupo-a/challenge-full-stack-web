import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterUseCase } from "./register.usecase";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { BadRequestError } from "@/common/domain/errors/bad-request-error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/modules/user/domain/entities/user.entity";
import { UserRole } from "@/modules/user/domain/enums/user-role.enum";

vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

describe("RegisterUseCase", () => {
  let registerUseCase: RegisterUseCase;
  let mockUserRepository: IUserRepository;

  const mockCreatedUser = User.fromPersistence({
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "newuser@example.com",
    password: "hashed_password",
    role: "ADMIN",
    created_at: new Date(),
    updated_at: new Date(),
  });

  beforeEach(() => {
    mockUserRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
    };
    registerUseCase = new RegisterUseCase(mockUserRepository);

    vi.clearAllMocks();
  });

  it("should register a new user and return token and user info", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepository.create).mockResolvedValue(mockCreatedUser);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as any);
    vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

    const result = await registerUseCase.execute({
      email: "newuser@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "newuser@example.com"
    );
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(result).toEqual({
      token: "valid_token",
      user: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "newuser@example.com",
        role: UserRole.ADMIN,
      },
    });
  });

  it("should throw UnprocessableEntityError if passwords do not match", async () => {
    await expect(
      registerUseCase.execute({
        email: "newuser@example.com",
        password: "password123",
        confirmPassword: "differentpassword",
      })
    ).rejects.toThrow(UnprocessableEntityError);

    expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it("should throw UnprocessableEntityError if email already exists", async () => {
    const existingUser = User.fromPersistence({
      id: "550e8400-e29b-41d4-a716-446655440001",
      email: "existing@example.com",
      password: "hashed_password",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(existingUser);

    await expect(
      registerUseCase.execute({
        email: "existing@example.com",
        password: "password123",
        confirmPassword: "password123",
      })
    ).rejects.toThrow(UnprocessableEntityError);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "existing@example.com"
    );
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it("should throw BadRequestError if user creation fails", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepository.create).mockResolvedValue(null as any);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as any);

    await expect(
      registerUseCase.execute({
        email: "newuser@example.com",
        password: "password123",
        confirmPassword: "password123",
      })
    ).rejects.toThrow(BadRequestError);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "newuser@example.com"
    );
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it("should hash the password before creating user", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepository.create).mockResolvedValue(mockCreatedUser);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as any);
    vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

    await registerUseCase.execute({
      email: "newuser@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
  });

  it("should create user with ADMIN role by default", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepository.create).mockResolvedValue(mockCreatedUser);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as any);
    vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

    const createSpy = vi.mocked(mockUserRepository.create);

    await registerUseCase.execute({
      email: "newuser@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(createSpy).toHaveBeenCalled();
    const createdUserArg = createSpy.mock.calls[0]?.[0];
    expect(createdUserArg?.role).toBe(UserRole.ADMIN);
  });

  it("should generate JWT token with correct payload", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(mockUserRepository.create).mockResolvedValue(mockCreatedUser);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed_password" as any);
    vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

    await registerUseCase.execute({
      email: "newuser@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        role: UserRole.ADMIN,
      },
      expect.any(String),
      {
        expiresIn: "1d",
      }
    );
  });
});
