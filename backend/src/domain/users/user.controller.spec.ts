import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entitites/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService({} as any);
        userController = new UserController(userService);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = { username: 'testUser', password: 'password', user_type: 'admin' };
            const newUser: User = { id: 1, ...createUserDto } as User;
            jest.spyOn(userService, 'create').mockResolvedValue(newUser);

            const result = await userController.create(createUserDto);

            expect(result).toEqual(newUser);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const mockUsers: User[] = [{ id: 1, username: 'testUser1', password: 'password1', user_type: 'admin' }, { id: 2, username: 'testUser2', password: 'password2', user_type: 'user' }];
            jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

            const result = await userController.findAll();

            expect(result).toEqual(mockUsers);
        });
    });

    describe('findOne', () => {
        it('should return a user if it exists', async () => {
            const userId = '1';
            const mockUser: User = { id: 1, username: 'testUser', password: 'password', user_type: 'admin' };
            jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);

            const result = await userController.findOne(userId);

            expect(result).toEqual(mockUser);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            const userId = '999';
            jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);

            await expect(userController.findOne(userId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a user if it exists', async () => {
            const userId = '1';
            const updateUserDto: UpdateUserDto = { username: 'updatedUser', password: 'newPassword', user_type: 'user' };
            const updatedUserData: Partial<User> = { ...updateUserDto };
            const updatedUser: User = { id: 1, ...updatedUserData } as User;
            jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

            const result = await userController.update(userId, updateUserDto);

            expect(result).toEqual(updatedUser);
        });


        it('should throw NotFoundException if user does not exist', async () => {
            const userId = '999';
            const updateUserDto: UpdateUserDto = { username: 'updatedUser', password: 'newPassword', user_type: 'user' };
            jest.spyOn(userService, 'update').mockResolvedValue(undefined);

            await expect(userController.update(userId, updateUserDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a user if it exists', async () => {
            const userId = '1';
            jest.spyOn(userService, 'remove').mockResolvedValue(undefined);

            await userController.remove(userId);

            expect(userService.remove).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            const userId = '999';
            jest.spyOn(userService, 'remove').mockRejectedValue(new NotFoundException());

            await expect(userController.remove(userId)).rejects.toThrow(NotFoundException);
        });
    });
});
