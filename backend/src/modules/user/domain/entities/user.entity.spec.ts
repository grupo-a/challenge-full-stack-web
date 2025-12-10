import { describe, it, expect } from "vitest";
import { User } from "./user.entity";
import { UserRole } from "../enums/user-role.enum";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";

describe("User Entity", () => {
  const validProps = {
    email: "john_doe@example.com",
    password: "password123",
    role: UserRole.ADMIN,
  };

  describe("create", () => {
    it("should create a valid user", () => {
      const user = User.create(validProps);
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe("john_doe@example.com");
    });

    it("should throw error if password is less than 8 characters", () => {
      expect(() => User.create({ ...validProps, password: "short" })).toThrow(
        UnprocessableEntityError
      );
    });
  });

  describe("fromPersistence", () => {
    it("should create user from persistence data", () => {
      const now = new Date();
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "jane_doe@example.com",
        password: "hashed_password",
        role: "ADMIN",
        created_at: now,
        updated_at: now,
      };

      const user = User.fromPersistence(data);

      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe("550e8400-e29b-41d4-a716-446655440000");
      expect(user.email).toBe("jane_doe@example.com");
      expect(user.role).toBe(UserRole.ADMIN);
      expect(user.createdAt).toBe(now);
      expect(user.updatedAt).toBe(now);
    });
  });
  describe("getters", () => {
    it("should return correct values", () => {
      const user = User.create(validProps);

      expect(user.email).toBe(validProps.email);
      expect(user.role).toBe(validProps.role);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe("verifyPassword", () => {
    it("should return true for correct password", async () => {
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = User.fromPersistence({
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "test@example.com",
        password: hashedPassword,
        role: "ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await user.verifyPassword("password123");
      expect(result).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = User.fromPersistence({
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "test@example.com",
        password: hashedPassword,
        role: "ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await user.verifyPassword("wrongpassword");
      expect(result).toBe(false);
    });
  });
});
