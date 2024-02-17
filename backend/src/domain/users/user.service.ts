import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entitites/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            return null;
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return undefined;
        }
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}
