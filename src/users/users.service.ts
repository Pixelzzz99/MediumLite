import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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

  async createUser(email: string, password: number): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.usersRepository.save(user);
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
    //const user = await this.usersRepository.findOne({
    //where: { id: userId },
    //relations: ['posts'],
    //});
    //return user.posts.reduce((acc, post) => acc + post.rating, 0);
    return 0;
  }
}
