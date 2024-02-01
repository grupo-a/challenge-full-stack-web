import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { repositoryUser } from '../../../constants/constants';
import { mock } from 'node:test';


describe('UsersService', () => {
  let service: UsersService;
  let userRepositoryMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      findAndCountAll: jest.fn(),
      findOne: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn().mockImplementation(async (values, options) => {
        return {
          ...values,
          ...options.where,
          // Simule o método get para evitar o erro
          get: (key) => values[key],
        };
      }),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: repositoryUser,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        ra: '123456',
        cpf: "798.494.381-88"
      };

      const createdUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        ra: '123456',
        cpf: "798.494.381-88",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      userRepositoryMock.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(userRepositoryMock.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of users', async () => {
      const page = 1;
      const pageSize = 10;
      const users: User[] = [];
      const totalItems = users.length;

      userRepositoryMock.findAndCountAll.mockResolvedValue({ rows: users, count: totalItems });

      const result = await service.findAll(page, pageSize);

      expect(userRepositoryMock.findAndCountAll).toHaveBeenCalledWith({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      expect(result).toEqual({ data: users, totalItems });
    });
  });

  describe('findOne', () => {
    it('should return the user with the given id', async () => {
      const userId = '123';
      const user = {
        id: '123',
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        ra: '123456',
        cpf: "798.494.381-88",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      userRepositoryMock.findByPk.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(userRepositoryMock.findByPk).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = '123';

      userRepositoryMock.findByPk.mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the user with the given id', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        'name': 'John Doe',
        'email': 'jonh@gmail.com',
      };

      const updatedUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
        ra: '123456',
        cpf: "798.494.381-88",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      userRepositoryMock.findOne.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(userRepositoryMock.update).toHaveBeenCalledWith(updateUserDto, { where: { id: '1' } });
      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        // ... outros campos atualizados
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        'name': 'John Doe',
        'email': 'jonh@gmail.com',
      };

      userRepositoryMock.update.mockResolvedValue([0, []]);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the user with the given id', async () => {
      const userId = '123';

      userRepositoryMock.findByPk.mockResolvedValue({ id: userId });
      userRepositoryMock.destroy.mockResolvedValue(true);

      const result = await service.remove(userId);

      expect(userRepositoryMock.findByPk).toHaveBeenCalledWith(userId);
      expect(userRepositoryMock.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = '123';

      userRepositoryMock.destroy.mockResolvedValue(0);

      await expect(service.remove(userId)).rejects.toThrow(NotFoundException);
    });
  });
});


