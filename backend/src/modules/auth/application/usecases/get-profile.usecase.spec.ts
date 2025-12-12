import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetProfileUseCase } from "./get-profile.usecase";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { NotFoundError } from "@/common/domain/errors/not-found-error";
import { User } from "@/modules/user/domain/entities/user.entity";
import { UserRole } from "@/modules/user/domain/enums/user-role.enum";

describe("GetProfileUseCase", () => {
  let getProfileUseCase: GetProfileUseCase;
  let mockUserRepository: IUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    };
    getProfileUseCase = new GetProfileUseCase(mockUserRepository);
  });

  it("should return user profile when user exists", async () => {
    const userId = "550e8400-e29b-41d4-a716-446655440000";
    const mockUser = User.fromPersistence({
      id: userId,
      email: "test@example.com",
      password: "hashedpassword",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    vi.spyOn(mockUserRepository, "findById").mockResolvedValue(mockUser);

    const result = await getProfileUseCase.execute(userId);

    expect(result).toEqual({
      id: userId,
      email: "test@example.com",
      role: UserRole.ADMIN,
    });
    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
  });

  it("should throw NotFoundError when user does not exist", async () => {
    const userId = "non-existent-id";

    vi.spyOn(mockUserRepository, "findById").mockResolvedValue(null);

    await expect(getProfileUseCase.execute(userId)).rejects.toThrow(
      NotFoundError
    );
    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
  });
});
