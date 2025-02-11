import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './../auth.service';
import { UserService } from 'src/users/users.service';
import { ConfigService } from 'src/config/config.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let configService: ConfigService;

  const mockUser = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.internet.username(),
  };

  const mockConfigService = {
    envConfig: {
      jwtSecret: 'secret-key',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when credentials are valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      //@ts-ignore
      jest.spyOn(jwt, 'sign').mockReturnValue('access-token');

      const signInDto = { email: mockUser.email, password: mockUser.password };
      const result = await authService.signIn(signInDto);

      expect(result).toEqual({ accessToken: 'access-token' });
      expect(userService.findOneByEmail).toHaveBeenCalledWith(signInDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        signInDto.password,
        mockUser.password,
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, name: mockUser.name },
        mockConfigService.envConfig.jwtSecret,
        { expiresIn: '1d' },
      );
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      const signInDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
      await expect(authService.signIn(signInDto)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const signInDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      await expect(authService.signIn(signInDto)).rejects.toThrowError(
        new UnauthorizedException('Invalid credentials'),
      );
    });
  });
});
