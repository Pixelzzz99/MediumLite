import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'emai' });
  }

  async validate(email: string, password: number): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
