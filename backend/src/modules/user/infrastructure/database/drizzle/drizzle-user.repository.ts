import { User } from "@/modules/user/domain/entities/user.entity";
import { IUserRepository } from "@/modules/user/application/repositories/user.repository";
import { db } from "@/common/infrastructure/database/drizzle/db/client";
import { usersTable } from "@/common/infrastructure/database/drizzle/db/schema";

export class DrizzleUserRepository implements IUserRepository {
  async create(user: User): Promise<User | null> {
    const [createdUser] = await db
      .insert(usersTable)
      .values({
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .returning();

    if (!createdUser) {
      return null;
    }

    return User.fromPersistence({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      password: createdUser.password,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.email, email),
    });

    if (!user) {
      return null;
    }

    return User.fromPersistence({
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.id, id),
    });

    if (!user) {
      return null;
    }

    return User.fromPersistence({
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
