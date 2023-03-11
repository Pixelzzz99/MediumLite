import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async getAllPosts(limit: number, offset: number): Promise<Post[]> {
    return await this.postsRepository.find({
      skip: offset,
      take: limit,
      relations: ['author'],
    });
  }

  async getPostById(id: number): Promise<Post> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  async createPost(postDto: CreatePostDto, user) {
    return await this.postsRepository.save({
      title: postDto.title,
      content: postDto.content,
      author: user.id,
    });
  }

  async updatePost(
    id: number,
    post: UpdatePostDto,
    user,
  ): Promise<UpdatePostDto> {
    const postToUpdate = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    console.log(postToUpdate);
    if (postToUpdate.author.id === user.id) {
      await this.postsRepository.update(id, post);
      return post;
    }
    return null;
  }

  async deletePost(id: number, user): Promise<boolean> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post.author.id === user.id) {
      await this.postsRepository.remove(post);
      return true;
    }
    return false;
  }
}
