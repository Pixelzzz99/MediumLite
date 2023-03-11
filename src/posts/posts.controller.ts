import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.postsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.postsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postsService.delete(id);
  }
}
