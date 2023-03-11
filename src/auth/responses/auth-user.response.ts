import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
