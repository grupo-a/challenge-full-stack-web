import { AppError } from "./app-error";

export class UnprocessableEntityError extends AppError {
  public readonly errors: { field: string; message: string }[];

  constructor(errors: { field: string; message: string }[]) {
    super("Field validation error", 422);
    this.name = "UnprocessableEntityError";
    this.errors = errors;
  }
}
