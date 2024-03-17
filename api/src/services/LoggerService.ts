import winston, {format, Logger} from 'winston';
import morgan from 'morgan';
import express from 'express';


type LoggerMixin = {
  logInfo: (message: string) => void;
  logWarning: (message: string) => void;
  logError: (message: string) => void;
  logDebug: (message: string) => void;
};

type CustomLogger = Logger & LoggerMixin;

export class LoggerService {
  private logger: CustomLogger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.align(),
        ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
      ]
    }) as CustomLogger;
  }

  public getLoggerMiddleware(): express.RequestHandler {
    return morgan('combined', {
      stream: {
        write: (message: string) => {
          this.logger.info(message.trim());
        }
      }
    });
  }

  public logInfo(message: string): void {
    this.logger.info(message);
  }

  public logWarning(message: string): void {
    this.logger.warn(message);
  }

  public logError(message: string): void {
    this.logger.error(message);
  }

  public logDebug(message: string): void {
    this.logger.debug(message);
  }
}

export default LoggerService;
