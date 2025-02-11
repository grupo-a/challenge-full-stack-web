import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../users.service';
import { User } from './../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUser: User = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.firstName(),
  } as User;

  const mockUserRepository = {
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a user when email exists', async () => {
      const result = await userService.findOneByEmail(mockUser.email);

      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
    });

    it('should return null when email does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await userService.findOneByEmail('test@example.com');

      expect(result).toBeNull();
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });
});
