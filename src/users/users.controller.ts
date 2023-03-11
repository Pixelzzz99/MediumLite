import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  UseGuards,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard)
  async getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return await this.usersService.getUsers(+limit, +offset);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Get(':id/posts')
  @UseGuards(AuthGuard)
  async getUsersPosts(
    @Param('id') userId: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return await this.usersService.getUsersPosts(+userId, +limit, +offset);
  }

  @Get(':id/rating')
  @UseGuards(AuthGuard)
  async getUserRating(@Param('id') userId: number) {
    return await this.usersService.getUserRating(+userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Query('email') email: string,
    @Query('password') password: number,
  ) {
    return await this.usersService.updateUser(+id, email, +password);
  }

  @Post('create-user')
  // @UseGuards(AuthGuard)
  async createUsers(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(+id);
  }
}
