import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { ConfigService } from '../config.service';
import { ConfigEnv } from '../config-env.model';

describe('ConfigService', () => {
  const defaultEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...defaultEnv };
  });

  const initService = async (config: any = {}): Promise<ConfigService> => {
    process.env = {
      ...defaultEnv,
      ...config,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();
    return module.get<ConfigService>(ConfigService);
  };

  it('should be defined', async () => {
    defaultEnv.NODE_ENV = 'development';
    const sut = await initService(defaultEnv);
    expect(sut).toBeDefined();
    expect(sut.onModuleInit()).toBeUndefined();
  });

  it('should set formatted env in envConfig property', async () => {
    const service = await initService(defaultEnv);
    const result = new ConfigEnv();

    result.nodeEnv = defaultEnv.NODE_ENV;
    result.httpPort = parseInt(defaultEnv.HTTP_PORT, 10);

    result.jwtSecret = defaultEnv.JWT_SECRET;

    result.typeormUsername = defaultEnv.TYPEORM_USERNAME;
    result.typeormPassword = defaultEnv.TYPEORM_PASSWORD;
    result.typeormHost = defaultEnv.TYPEORM_HOST;
    result.typeormPort = parseInt(defaultEnv.TYPEORM_PORT, 10);
    result.typeormDatabase = defaultEnv.TYPEORM_DATABASE;

    expect(service.envConfig).toEqual(result);
    expect(result.isProduction).toBeFalsy();
  });

  it('should throw err on env is invalid', async () => {
    const env = {
      ...defaultEnv,
      NODE_ENV: 123456,
    };

    let capturedErr;
    try {
      await initService(env);
    } catch (err) {
      capturedErr = err;
    }

    expect(capturedErr).toBeInstanceOf(ValidationError);
  });
});
