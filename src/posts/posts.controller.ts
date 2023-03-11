import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getPosts(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return await this.postsService.getAllPosts(+limit, +offset);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.getPostById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPosts(@Body() postDto: CreatePostDto, @Req() request) {
    const user = request.user;
    return await this.postsService.createPost(postDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePosts(
    @Param('id') id: number,
    @Body() body: UpdatePostDto,
    @Req() request,
  ): Promise<UpdatePostDto> {
    const user = request.user;
    return await this.postsService.updatePost(id, body, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePosts(@Param('id') id: number, @Req() request): Promise<boolean> {
    const user = request.user;
    return await this.postsService.deletePost(id, user);
  }
}
