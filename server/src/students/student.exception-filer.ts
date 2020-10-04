import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnprocessableEntityException,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  PG_UNIQUE_VIOLATION,
  PG_NOT_NULL_VIOLATION,
} from "@drdgvhbh/postgres-error-codes";
import { QueryFailedError } from "typeorm";
import { HTTP_EXCEPTIONS_MESSAGES } from "@shared/constants";

@Catch()
export class StudentExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (exception instanceof QueryFailedError) {
      let finalException: HttpException;

      switch ((exception as any).code) {
        case PG_UNIQUE_VIOLATION:
          finalException = new UnprocessableEntityException(
            HTTP_EXCEPTIONS_MESSAGES.UNIQUE_VIOLATION,
          );
          break;
        case PG_NOT_NULL_VIOLATION:
          finalException = new UnprocessableEntityException(
            HTTP_EXCEPTIONS_MESSAGES.NOT_NULL_VIOLATION,
          );
          break;
      }

      return response
        .status(finalException.getStatus())
        .json(finalException.getResponse());
    }

    const internalError = new InternalServerErrorException();
    return response
      .status(internalError.getStatus())
      .json(internalError.getResponse());
  }
}
