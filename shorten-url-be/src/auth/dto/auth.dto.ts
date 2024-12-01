// src/auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class Response {
  data: any;
  error: any;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UserResponse extends Response {
  data: Omit<User, 'password'>;
}

export class AuthResponse extends Response {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  };
}
