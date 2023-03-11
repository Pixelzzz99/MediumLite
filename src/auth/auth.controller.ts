import { Body, Post, Request, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserResponse } from './responses/auth-user.response';
// import { JwtStrategy } from './jwt.strategy';
// import { LocalStrategy } from './local.stategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() userDto: CreateUserDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(userDto);
  }
}
