import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { usersProviders } from '../user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserPresenter } from '../user.presenter';
import { CollectionPresenter } from '../../presenters/collection.presenter';
import { UpdateUserDto } from '../dto/update-user.dto';

const mockUsers = {
  data: [
    { id: '1', name: 'John Doe', email: 'john@gmail.com', password: '123456', ra: '123456', cpf: "798.494.381-88", createdAt: new Date() },
    { id: '2', name: 'Mary', email: 'mary@gmail.com', password: '123456', ra: '1234748', cpf: "798.494.381-55", createdAt: new Date() },
    { id: '3', name: 'Luck', email: 'lucku@gmail.com', password: '123456', ra: '12347458', cpf: "798.494.381-99", createdAt: new Date() }
  ],
  paginationProps: { current_page: 1, per_page: 10, last_page: 1, total: 3 }
};

const mockNewUser = { id: '1', name: 'John Doe', email: 'john@gmail.com', password: '123456', ra: '123456', cpf: "798.494.381-88", createdAt: new Date() }


describe('UsersController Unit Tests', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            create: jest.fn().mockResolvedValue(mockNewUser),
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockResolvedValue(mockUsers.data[0]),
            update: jest.fn().mockResolvedValue(mockNewUser),
            remove: jest.fn().mockResolvedValue(true),
          }),
        },
        ...usersProviders,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it('should call create method', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      ra: '123456',
      cpf: "798.494.381-88"
    };

    const response = await controller.create(createUserDto);

    expect(response).toBeInstanceOf(UserPresenter);
    expect(usersService.create).toHaveBeenCalledTimes(1);
    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  });


  it('should call findAll method', async () => {

    const response = await controller.findAll(1, 10, '');

    expect(usersService.findAll).toHaveBeenCalledTimes(1);
    expect(usersService.findAll).toHaveBeenCalledWith(1, 10, '');
    expect(response).toBeInstanceOf(CollectionPresenter);
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('meta');
  });

  it('should call findOne method', async () => {
    const response = await controller.findOne('1');

    expect(usersService.findOne).toHaveBeenCalledTimes(1);
    expect(usersService.findOne).toHaveBeenCalledWith('1');
    expect(response).toBeInstanceOf(UserPresenter);
    expect(response.ra).toEqual(mockUsers.data[0].ra);
  });

  it('should call update method', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'John Doe',
      email: 'john@gmail.com',
    };

    const response = await controller.update('1', updateUserDto);

    expect(usersService.update).toHaveBeenCalledTimes(1);
    expect(usersService.update).toHaveBeenCalledWith('1', updateUserDto);
    expect(response).toBeInstanceOf(UserPresenter);
    expect(response.name).toEqual(updateUserDto.name);
    expect(response.email).toEqual(updateUserDto.email);
  });

  it('should call remove method', async () => {
    const response = await controller.remove('1');

    expect(usersService.remove).toHaveBeenCalledTimes(1);
    expect(usersService.remove).toHaveBeenCalledWith('1');
    expect(response).toBe(true);
  });

});
