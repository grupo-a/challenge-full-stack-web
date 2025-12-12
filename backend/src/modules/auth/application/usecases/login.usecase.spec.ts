import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUseCase } from "./login.usecase";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { UserRole } from "@/modules/user/domain/enums/user-role.enum";
import { User } from "@/modules/user/domain/entities/user.entity";

vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: IUserRepository;

  const mockUser = User.create({
    email: "testuser",
    password: "hashed_password",
    role: UserRole.ADMIN,
  });

  Object.defineProperty(mockUser, "_id", { value: 1 });

  beforeEach(() => {
    mockUserRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };
    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  it("should return token and user info on successful login", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
    vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

    const result = await loginUseCase.execute({
      email: "testuser",
      password: "password123",
    });

    expect(result).toEqual({
      token: "valid_token",
      user: {
        id: 1,
        email: "testuser",
        role: UserRole.ADMIN,
      },
    });
  });

  it("should throw UnauthorizedError if user not found", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

    await expect(
      loginUseCase.execute({
        email: "unknown",
        password: "password123",
      })
    ).rejects.toThrow(UnauthorizedError);
  });

  it("should throw UnauthorizedError if password is invalid", async () => {
    vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as any);

    await expect(
      loginUseCase.execute({
        email: "testuser",
        password: "wrongpassword",
      })
    ).rejects.toThrow(UnauthorizedError);
  });
});
