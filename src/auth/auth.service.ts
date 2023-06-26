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
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

enum PostgresErrorCode {
  UniqueViolation = '23505',
}

interface TokenPayload {
  userId: number;
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
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ForbiddenException('User with that email already exists');
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(login: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getByLogin(login);
      await this.verifyPassword(password, user.password);
      //const payload = { sub: user.userId, username: user.username };

      user.password = undefined;

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async login(user: any) {
    const payload = { login: user.login, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'TOKEN_EXPIRE_TIME',
    )}`;
  }
}
