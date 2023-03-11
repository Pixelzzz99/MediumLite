import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/constants/errors';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(limit: number, offset: number): Promise<User[]> {
    return await this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async getUsersPosts(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<User[]> {
    return await this.usersRepository.find({
      skip: offset,
      take: limit,
      relations: ['posts'],
      where: { id: userId },
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    const { email, password } = userDto;
    await this.usersRepository.save({
      email,
      password,
    });
    return userDto;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async updateUser(id: number, email: string, password: number): Promise<User> {
    const user = await this.getUserById(id);
    user.email = email;
    user.password = password;
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);
    return await this.usersRepository.remove(user);
  }

  async getUserRating(userId: number): Promise<number> {
    return 0;
  }
}
