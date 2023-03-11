import { CreateUserDto } from './../users/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthUserResponse } from './responses/auth-user.response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    const { email } = userDto;
    if (await this.usersService.findUserByEmail(email)) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    return this.usersService.createUser(userDto);
  }

  async loginUser(userDto: UserLoginDto): Promise<AuthUserResponse> {
    const { email, password } = userDto;
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException(AppError.USER_NOT_FOUND);
    }
    if (user.password !== password) {
      throw new BadRequestException(AppError.INVALID_LOGIN);
    }
    const token = await this.tokenService.generateToken(userDto.email);
    return {
      email: user.email,
      password: user.password,
      token: token,
    };
  }
}
