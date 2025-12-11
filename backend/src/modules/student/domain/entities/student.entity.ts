import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";

export interface CreateStudentProps {
  name: string;
  email: string;
  cpf: string;
}

export interface UpdateStudentProps {
  name?: string;
  email?: string;
}

export class Student {
  private _id: string;
  private _name: string;
  private _email: string;
  private _cpf: string;
  private _ra: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: string,
    name: string,
    email: string,
    cpf: string,
    ra: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._cpf = cpf;
    this._ra = ra;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get cpf(): string {
    return this._cpf;
  }

  get ra(): number {
    return this._ra;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public update(props: UpdateStudentProps): void {
    const errors: Array<{ field: string; message: string }> = [];

    if (props.name !== undefined) {
      if (!Student.validateName(props.name)) {
        errors.push({
          field: "name",
          message: "Name must be at least 3 characters long",
        });
      } else {
        this._name = props.name;
      }
    }

    if (props.email !== undefined) {
      if (!Student.validateEmail(props.email)) {
        errors.push({
          field: "email",
          message: "Invalid email format",
        });
      } else {
        this._email = props.email;
      }
    }

    if (errors.length > 0) {
      throw new UnprocessableEntityError(errors);
    }

    this._updatedAt = new Date();
  }

  public static create(props: CreateStudentProps): Student {
    const errors: Array<{ field: string; message: string }> = [];

    if (!this.validateName(props.name)) {
      errors.push({
        field: "name",
        message: "Name must be at least 3 characters long",
      });
    }

    if (!this.validateEmail(props.email)) {
      errors.push({
        field: "email",
        message: "Invalid email format",
      });
    }

    if (!this.validateCPF(props.cpf)) {
      errors.push({
        field: "cpf",
        message: "Invalid CPF format",
      });
    }

    if (errors.length > 0) {
      throw new UnprocessableEntityError(errors);
    }

    const now = new Date();

    return new Student("", props.name, props.email, props.cpf, 0, now, now);
  }

  private static validateName(name: string): boolean {
    return typeof name === "string" && name.trim().length >= 3;
  }

  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static validateCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, "");

    if (cleanCPF.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(cleanCPF.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(cleanCPF.charAt(10))) {
      return false;
    }

    return true;
  }

  public static fromPersistence(data: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    ra: number;
    createdAt: Date;
    updatedAt: Date;
  }): Student {
    return new Student(
      data.id,
      data.name,
      data.email,
      data.cpf,
      data.ra,
      data.createdAt,
      data.updatedAt
    );
  }
}
