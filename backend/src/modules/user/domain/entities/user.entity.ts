import { UserRole } from "../enums/user-role.enum";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { compare } from "bcryptjs";

export interface CreateUserProps {
  email: string;
  password: string;
  role: UserRole;
}

export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _role: UserRole;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public async verifyPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this._password);
  }

  public static create(props: CreateUserProps): User {
    this.validatePassword(props.password);
    const now = new Date();

    return new User(
      "",
      props.email,
      props.password || "",
      props.role,
      now,
      now
    );
  }

  private static validatePassword(password?: string) {
    if (password && password.length < 8) {
      throw new UnprocessableEntityError([
        {
          field: "password",
          message: "Password must be at least 8 characters long",
        },
      ]);
    }
  }

  public static fromPersistence(data: {
    id: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }): User {
    return new User(
      data.id,
      data.email,
      data.password,
      data.role as UserRole,
      data.created_at,
      data.updated_at
    );
  }
}
