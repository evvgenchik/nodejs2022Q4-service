import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/createUserDto';
import { UsersService } from '../users/users.service';

enum PrismaErrorCode {
  UniqueViolation = 'P2002',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(registrationData: CreateUserDto) {
    const salt = +this.configService.get<number>('CRYPT_SALT') || 10;
    const hashedPassword = await bcrypt.hash(registrationData.password, salt);

    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      createdUser.hashedRefreshToken = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PrismaErrorCode.UniqueViolation) {
        throw new ForbiddenException('User with that login already exists');
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  login(user: any) {
    const payload = { login: user.login, userId: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: `${this.configService.get('TOKEN_REFRESH_EXPIRE_TIME')}`,
    });
    const accessToken = this.jwtService.sign(payload);

    return {
      refreshToken,
      accessToken,
    };
  }

  refresh(user: any) {
    const payload = { login: user.login, userId: user.userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: `${this.configService.get('TOKEN_REFRESH_EXPIRE_TIME')}`,
    });
    const accessToken = this.jwtService.sign(payload);

    return {
      refreshToken,
      accessToken,
    };
  }

  async validateUser(login: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getByLogin(login);
      await this.verifyPassword(password, user.password);

      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
