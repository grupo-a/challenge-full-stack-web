import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ERRORS_STATUS } from './errors.enum';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error & { status: number }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const message = this.showErrorMessage(exception, request.url);
    if (message) {
      this.logger.error(
        JSON.stringify({ ...message, stack: exception.stack }, undefined, 4),
      );
    }
    return response.status(this.statusCode(exception)).json(message);
  }

  showErrorMessage(exception: Error & { status: number }, path: string) {
    return {
      code: exception.message,
      path,
      timestamp: new Date().toLocaleString('pt-BR'),
    };
  }

  statusCode(exception: Error & { status: number }) {
    return ERRORS_STATUS[this.statusKey(exception.message)] ?? exception.status;
  }

  statusKey(value: string) {
    return value.replace(' ', '_').toUpperCase();
  }
}
