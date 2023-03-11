import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
  @IsEmail()
  email: string;

  @IsNumber()
  password: number;

  @IsString()
  token: string;
}
