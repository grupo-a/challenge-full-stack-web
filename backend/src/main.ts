import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, raw, urlencoded } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { createSwaggerDoc } from './common/swagger/create-doc.swagger';
import { HttpExceptionFilter } from './common/errors/http-exception.filter';
import { ERRORS_DESCRIPTION } from './common/errors/errors.enum';

(async function bootstrap() {
  await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
    cors: {
      origin: '*',
      methods: ['PUT', 'PATCH', 'GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    abortOnError: false,
  }).then(async (app) => {
    app
      .use(
        json({ limit: '5kb' }),
        raw({ limit: '5kb' }),
        urlencoded({ extended: true, limit: '5kb' }),
      )
      .useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          stopAtFirstError: true,
          exceptionFactory: () => new Error(ERRORS_DESCRIPTION.PAYLOAD_INVALID),
        }),
      )
      .useGlobalFilters(new HttpExceptionFilter())
      .enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    await createSwaggerDoc(app);
    await app.listen(3000);
  });
})();
