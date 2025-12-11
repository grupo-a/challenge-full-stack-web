import { describe, it, expect } from "vitest";
import { Student } from "./student.entity";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";

describe("Student Entity", () => {
  describe("create", () => {
    it("should create a valid student", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      expect(student.name).toBe("João Silva");
      expect(student.email).toBe("joao@example.com");
      expect(student.cpf).toBe("12345678909");
      expect(student.id).toBe("");
      expect(student.ra).toBe(0);
    });

    it("should throw error when name is too short", () => {
      expect(() => {
        Student.create({
          name: "Jo",
          email: "joao@example.com",
          cpf: "12345678909",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when name is empty", () => {
      expect(() => {
        Student.create({
          name: "",
          email: "joao@example.com",
          cpf: "12345678909",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when email is invalid", () => {
      expect(() => {
        Student.create({
          name: "João Silva",
          email: "invalid-email",
          cpf: "12345678909",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when CPF has invalid length", () => {
      expect(() => {
        Student.create({
          name: "João Silva",
          email: "joao@example.com",
          cpf: "123456789",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when CPF has all same digits", () => {
      expect(() => {
        Student.create({
          name: "João Silva",
          email: "joao@example.com",
          cpf: "11111111111",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when CPF has invalid check digits", () => {
      expect(() => {
        Student.create({
          name: "João Silva",
          email: "joao@example.com",
          cpf: "12345678900",
        });
      }).toThrow(UnprocessableEntityError);
    });

    it("should accept CPF with formatting characters", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "123.456.789-09",
      });

      expect(student.cpf).toBe("123.456.789-09");
    });

    it("should throw multiple validation errors", () => {
      try {
        Student.create({
          name: "Jo",
          email: "invalid-email",
          cpf: "123",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityError);
        if (error instanceof UnprocessableEntityError) {
          expect(error.errors.length).toBe(3);
        }
      }
    });
  });

  describe("update", () => {
    it("should update student name", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      student.update({ name: "João Santos" });

      expect(student.name).toBe("João Santos");
    });

    it("should update student email", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      student.update({ email: "joao.silva@example.com" });

      expect(student.email).toBe("joao.silva@example.com");
    });

    it("should update both name and email", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      student.update({
        name: "João Santos",
        email: "joao.santos@example.com",
      });

      expect(student.name).toBe("João Santos");
      expect(student.email).toBe("joao.santos@example.com");
    });

    it("should throw error when updating with invalid name", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      expect(() => {
        student.update({ name: "Jo" });
      }).toThrow(UnprocessableEntityError);
    });

    it("should throw error when updating with invalid email", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      expect(() => {
        student.update({ email: "invalid-email" });
      }).toThrow(UnprocessableEntityError);
    });

    it("should not change data when update throws error", () => {
      const student = Student.create({
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
      });

      const originalName = student.name;
      const originalEmail = student.email;

      try {
        student.update({ name: "Jo", email: "invalid" });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityError);
      }

      expect(student.name).toBe(originalName);
      expect(student.email).toBe(originalEmail);
    });
  });

  describe("fromPersistence", () => {
    it("should create student from persistence data", () => {
      const now = new Date();
      const student = Student.fromPersistence({
        id: "123",
        name: "João Silva",
        email: "joao@example.com",
        cpf: "12345678909",
        ra: 12345,
        createdAt: now,
        updatedAt: now,
      });

      expect(student.id).toBe("123");
      expect(student.name).toBe("João Silva");
      expect(student.email).toBe("joao@example.com");
      expect(student.cpf).toBe("12345678909");
      expect(student.ra).toBe(12345);
      expect(student.createdAt).toBe(now);
      expect(student.updatedAt).toBe(now);
    });
  });
});
