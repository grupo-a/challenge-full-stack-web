import {
  Injectable,
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

@Injectable()
export class CodedValidatorPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => this.transformException(errors),
    });
  }

  transformException(errors: ValidationError[]): BadRequestException {
    return new BadRequestException({
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
      details: errors.map((error) => ({
        field: error.property,
        constraints: error.constraints,
        children: error.children?.length ? error.children : undefined,
      })),
    });
  }
}
