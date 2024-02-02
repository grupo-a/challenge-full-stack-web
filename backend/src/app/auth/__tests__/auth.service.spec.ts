import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: '1',
    ra: '123456',
    password: '$2b$10$CFzWuKGbXoiQZ3lXfNqvVO7.UmWlWRJ8.hIpN7Euz5poCgmp.nlT6',
    email: 'email@gmail.com',
    name: 'name',
    cpf: '123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            searchUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token if the login is successful', async () => {
      const ra = '123456';
      const password = '123456';
      const payload = {
        ra: mockUser.ra,
        name: mockUser.name,
        email: mockUser.email,
        sub: mockUser.id,
        authorization: ['user.delete']
      };

      userService.searchUser = jest.fn().mockResolvedValue(mockUser);

      jwtService.sign = jest.fn().mockReturnValue('token');

      const result = await service.login(ra, password);

      expect(userService.searchUser).toHaveBeenCalled();
      expect(userService.searchUser).toHaveBeenCalledWith({ where: { ra: ra } });
      expect(compareSync(password, mockUser.password)).toBe(true);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result.token).toBe('token');
    });

    it('should throw an null if the user is not found', async () => {
      const ra = '12345';
      const password = 'password';

      userService.searchUser = jest.fn().mockRejectedValue(new NotFoundException('User not found'));

      const user = await service.login(ra, password);

      expect(userService.searchUser).toHaveBeenCalled();
      expect(userService.searchUser).toHaveBeenCalledWith({ where: { ra: ra } });
      expect(user).toBe(null);
    });

    it('should throw an error if the password is incorrect', async () => {
      const ra = '123456';
      const password = 'password';

      userService.searchUser = jest.fn().mockResolvedValue(mockUser);

      const result = await service.login(ra, password);
    
      expect(userService.searchUser).toHaveBeenCalled();
      expect(userService.searchUser).toHaveBeenCalledWith({ where: { ra: ra } });
      expect(compareSync(password, mockUser.password)).toBe(false);
      expect(result).toBe(null);
    });
  });
});


