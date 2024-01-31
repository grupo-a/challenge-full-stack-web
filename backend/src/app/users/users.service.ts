import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { repositoryUser } from 'src/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(repositoryUser)
    private usersRepository: typeof User
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = this.usersRepository.findByPk(id);

    if (!user)
      throw new Error('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk(id);

    if (!user)
      throw new Error('User not found');

    await user.update(updateUserDto);
    
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findByPk(id);

    if (!user)
      throw new Error('User not found');

    await this.usersRepository.destroy({ where: { id } });
    return user;
  }
}
