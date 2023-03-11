import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly password: number;
}
