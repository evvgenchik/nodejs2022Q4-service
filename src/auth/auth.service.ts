import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

enum PostgresErrorCode {
  UniqueViolation = '23505',
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 3);
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

  async login(login: string, password: string): Promise<any> {
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
