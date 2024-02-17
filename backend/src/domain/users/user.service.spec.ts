import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entitites/user.entity'
import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = { username: 'testUser', password: 'password', user_type: 'user' };
            const savedUser: User = { id: 1, ...createUserDto };
            jest.spyOn(userRepository, 'create').mockReturnValue(savedUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

            const result = await service.create(createUserDto);

            expect(result).toEqual(savedUser);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users: User[] = [{ id: 1, username: 'user1', password: 'password1', user_type: 'user' }];
            jest.spyOn(userRepository, 'find').mockResolvedValue(users);

            const result = await service.findAll();

            expect(result).toEqual(users);
        });
    });

    describe('findOne', () => {
        it('should return a user if it exists', async () => {
            const userId = 1;
            const user: User = { id: userId, username: 'testUser', password: 'password', user_type: 'user' };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

            const result = await service.findOne(userId);

            expect(result).toEqual(user);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            const userId = 999;
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

            await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByUsername', () => {
        it('should return a user if it exists', async () => {
            const username = 'testUser';
            const user: User = { id: 1, username, password: 'password', user_type: 'user' };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

            const result = await service.findByUsername(username);

            expect(result).toEqual(user);
        });

        it('should return null if user does not exist', async () => {
            const username = 'nonExistentUser';
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

            const result = await service.findByUsername(username);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a user if it exists', async () => {
            const userId = 1;
            const updateUserDto: UpdateUserDto = { username: 'updatedUser', password: 'newPassword', user_type: 'user' };
            const updatedUser: User = { id: userId, ...updateUserDto } as User;
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

            const result = await service.update(userId, updateUserDto);

            expect(result).toEqual(updatedUser);
        });

        it('should return undefined if user does not exist', async () => {
            const userId = 999;
            const updateUserDto: UpdateUserDto = { username: 'updatedUser', password: 'newPassword', user_type: 'user' };
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

            const result = await service.update(userId, updateUserDto);

            expect(result).toBeUndefined();
        });
    });

    describe('remove', () => {
        it('should remove a user if it exists', async () => {
            const userId = 1;
            jest.spyOn(userRepository, 'softDelete').mockResolvedValue({ affected: 1 } as UpdateResult);

            await expect(service.remove(userId)).resolves.not.toThrow();
        });

        it('should not throw if user does not exist', async () => {
            const userId = 999;
            jest.spyOn(userRepository, 'softDelete').mockResolvedValue({ affected: 0 } as UpdateResult);

            await expect(service.remove(userId)).resolves.not.toThrow();
        });
    });
});
