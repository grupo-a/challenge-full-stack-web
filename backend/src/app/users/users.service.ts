import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { repositoryUser } from '../../constants/constants';
import { FindOptions } from 'sequelize';
import { Op } from 'sequelize';

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

  async findAll(page: number = 1, pageSize: number = 10, name?: string): Promise<{ data: User[]; totalItems: number }> {
    const offset = (page - 1) * pageSize;

    const where = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const users = await this.usersRepository.findAndCountAll({
      where: where,
      limit: pageSize,
      offset,
    });

    return {
      data: users.rows,
      totalItems: users.count,
    };
  }

  async searchUser(searchParam?: FindOptions) {
    const user = await this.usersRepository.findOne(searchParam);

    if (!user)
      throw new NotFoundException('User not found');

    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findByPk(id);

    if (!user)
      throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const update_user = await user.update(updateUserDto);

    return update_user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    const delete_user = await this.usersRepository.destroy({
      where: { id: user.id }
    });

    return delete_user;
  }
}
