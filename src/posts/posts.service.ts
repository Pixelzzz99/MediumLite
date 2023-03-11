import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  async create(post: Post): Promise<Post> {
    return await this.postsRepository.save(post);
  }

  async update(id: number, post: Post): Promise<Post> {
    await this.postsRepository.update(id, post);
    return await this.postsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    return await this.postsRepository.remove(post);
  }
}
