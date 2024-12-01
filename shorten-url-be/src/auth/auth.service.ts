// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from './schemas/user.schema';
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  UserResponse,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, username } = registerDto;

    console.log('registerDto', registerDto);

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    const accessToken = this.createToken(user);

    return {
      data: {
        accessToken,
        user: {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        },
      },
      error: null,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLogin = new Date();
    await user.save();

    const accessToken = this.createToken(user);

    return {
      data: {
        accessToken,
        user: {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        },
      },
      error: null,
    };
  }

  async getProfile(userId: string): Promise<UserResponse> {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      data: user,
      error: null,
    };
  }

  private createToken(user: User): string {
    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    });
  }
}
