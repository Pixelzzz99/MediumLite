import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/constants/errors';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUser(
    email: string,
    userDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException(AppError.USER_NOT_FOUND);
    }
    const { password } = userDto;
    await this.usersRepository.update(user.id, { password });
    return userDto;
  }

  async deleteUser(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    await this.usersRepository.remove(user);
    return true;
  }

  async updateUserRating(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.rating = user.rating + 1;
    await this.usersRepository.save(user);
    return user;
  }
}
