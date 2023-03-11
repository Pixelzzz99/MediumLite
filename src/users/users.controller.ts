import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  UseGuards,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return await this.usersService.getUsers(+limit, +offset);
  }

  @UseGuards(AuthGuard)
  @Get(':id/posts')
  async getUsersPosts(
    @Param('id') userId: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return await this.usersService.getUsersPosts(+userId, +limit, +offset);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    return await this.usersService.updateUser(user.email, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return await this.usersService.deleteUser(user.email);
  }
}
