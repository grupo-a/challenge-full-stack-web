import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginUseCase } from "./login.usecase";
import { IUserRepository } from "@/modules/users/application/repositories/user.repository";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/modules/users/domain/entities/user";
import { UserRole } from "@/modules/users/domain/enums/user-role.enum";

// Mock bcrypt and jwt
vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

describe("LoginUseCase", () => {
    let loginUseCase: LoginUseCase;
    let mockUserRepository: IUserRepository;

    const mockUser = User.create({
        username: "testuser",
        password: "hashed_password",
        role: UserRole.COLLABORATOR,
    });

    // Mock ID since it's private and set in constructor/persistence
    Object.defineProperty(mockUser, "_id", { value: 1 });

    beforeEach(() => {
        mockUserRepository = {
            create: vi.fn(),
            findByUsername: vi.fn(),
            findById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            findAll: vi.fn(),
        };
        loginUseCase = new LoginUseCase(mockUserRepository);
    });

    it("should return token and user info on successful login", async () => {
        vi.mocked(mockUserRepository.findByUsername).mockResolvedValue(mockUser);
        vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
        vi.mocked(jwt.sign).mockReturnValue("valid_token" as any);

        const result = await loginUseCase.execute({
            username: "testuser",
            password: "password123",
        });

        expect(result).toEqual({
            token: "valid_token",
            user: {
                id: 1,
                username: "testuser",
                role: UserRole.COLLABORATOR,
            },
        });
    });

    it("should throw UnauthorizedError if user not found", async () => {
        vi.mocked(mockUserRepository.findByUsername).mockResolvedValue(null);

        await expect(
            loginUseCase.execute({
                username: "unknown",
                password: "password123",
            })
        ).rejects.toThrow(UnauthorizedError);
    });

    it("should throw UnauthorizedError if password is invalid", async () => {
        vi.mocked(mockUserRepository.findByUsername).mockResolvedValue(mockUser);
        vi.mocked(bcrypt.compare).mockResolvedValue(false as any);

        await expect(
            loginUseCase.execute({
                username: "testuser",
                password: "wrongpassword",
            })
        ).rejects.toThrow(UnauthorizedError);
    });
});
