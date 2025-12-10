import { AppError } from "@/common/domain/errors/app-error";
import { UnprocessableEntityError } from "@/common/domain/errors/unprocessable-entity-error";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (error instanceof ZodError) {
    return res.status(422).json({
      status: "error",
      message: "Field validation error",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof UnprocessableEntityError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      errors: error.errors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
