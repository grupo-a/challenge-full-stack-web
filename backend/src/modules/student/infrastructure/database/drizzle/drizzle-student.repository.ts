import { Student } from "@/modules/student/domain/entities/student.entity";
import {
  IStudentRepository,
  ListStudentsFilters,
} from "@/modules/student/application/repositories/student.repository";
import { db } from "@/common/infrastructure/database/drizzle/db/client";
import { studentsTable } from "@/common/infrastructure/database/drizzle/db/schema";
import { PaginatedResponse } from "@/common/infrastructure/http/dtos/pagination.dto";
import { eq, ilike, or, sql } from "drizzle-orm";

export class DrizzleStudentRepository implements IStudentRepository {
  async create(student: Student): Promise<Student | null> {
    const [createdStudent] = await db
      .insert(studentsTable)
      .values({
        name: student.name,
        email: student.email,
        cpf: student.cpf,
      })
      .returning();

    if (!createdStudent) {
      return null;
    }

    return Student.fromPersistence({
      id: createdStudent.id,
      name: createdStudent.name,
      email: createdStudent.email,
      cpf: createdStudent.cpf,
      ra: createdStudent.ra,
      createdAt: createdStudent.createdAt,
      updatedAt: createdStudent.updatedAt,
    });
  }

  async findById(id: string): Promise<Student | null> {
    const student = await db.query.studentsTable.findFirst({
      where: (studentsTable, { eq }) => eq(studentsTable.id, id),
    });

    if (!student) {
      return null;
    }

    return Student.fromPersistence({
      id: student.id,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
      ra: student.ra,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await db.query.studentsTable.findFirst({
      where: (studentsTable, { eq }) => eq(studentsTable.email, email),
    });

    if (!student) {
      return null;
    }

    return Student.fromPersistence({
      id: student.id,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
      ra: student.ra,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    const student = await db.query.studentsTable.findFirst({
      where: (studentsTable, { eq }) => eq(studentsTable.cpf, cpf),
    });

    if (!student) {
      return null;
    }

    return Student.fromPersistence({
      id: student.id,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
      ra: student.ra,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  }

  async findByRa(ra: number): Promise<Student | null> {
    const student = await db.query.studentsTable.findFirst({
      where: (studentsTable, { eq }) => eq(studentsTable.ra, ra),
    });

    if (!student) {
      return null;
    }

    return Student.fromPersistence({
      id: student.id,
      name: student.name,
      email: student.email,
      cpf: student.cpf,
      ra: student.ra,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  }

  async list(
    filters: ListStudentsFilters
  ): Promise<PaginatedResponse<Student>> {
    const { page, limit, name, email, ra } = filters;
    const offset = (page - 1) * limit;

    const whereConditions = [];

    if (name && name.trim()) {
      whereConditions.push(ilike(studentsTable.name, `%${name}%`));
    }

    if (email && email.trim()) {
      whereConditions.push(ilike(studentsTable.email, `%${email}%`));
    }

    if (ra !== undefined) {
      whereConditions.push(eq(studentsTable.ra, ra));
    }

    const whereClause =
      whereConditions.length > 0 ? or(...whereConditions) : undefined;

    const [studentsResult, countResult] = await Promise.all([
      db
        .select()
        .from(studentsTable)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(studentsTable.createdAt),
      db
        .select({ count: sql<number>`count(*)` })
        .from(studentsTable)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);

    const students = studentsResult.map((student) =>
      Student.fromPersistence({
        id: student.id,
        name: student.name,
        email: student.email,
        cpf: student.cpf,
        ra: student.ra,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      })
    );

    return {
      data: students,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async update(student: Student): Promise<Student | null> {
    const [updatedStudent] = await db
      .update(studentsTable)
      .set({
        name: student.name,
        email: student.email,
        updatedAt: new Date(),
      })
      .where(eq(studentsTable.id, student.id))
      .returning();

    if (!updatedStudent) {
      return null;
    }

    return Student.fromPersistence({
      id: updatedStudent.id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      cpf: updatedStudent.cpf,
      ra: updatedStudent.ra,
      createdAt: updatedStudent.createdAt,
      updatedAt: updatedStudent.updatedAt,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(studentsTable)
      .where(eq(studentsTable.id, id))
      .returning();

    return result.length > 0;
  }
}
