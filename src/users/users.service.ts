import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToClass } from '@nestjs/class-transformer';
import { UserEntity } from './userEntety';
import * as bcrytp from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: { ...dto } });
    const userTransformed = plainToClass(UserEntity, user);
    return userTransformed;
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    const allUsersTransformed = users.map((user) =>
      plainToClass(UserEntity, user),
    );
    return allUsersTransformed;
  }

  async get(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userTransformed = plainToClass(UserEntity, user);
    return userTransformed;
  }

  async getByLogin(login: string) {
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userTransformed = plainToClass(UserEntity, user);
    return userTransformed;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password incorrect');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        version: ++user.version,
        password: newPassword,
      },
    });
    const userTransformed = plainToClass(UserEntity, updatedUser);

    return userTransformed;
  }

  async delete(id: string) {
    const user = await this.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async setCurrentRefreshToken(refreshToken: string, login: string) {
    const hashedRefreshToken = await bcrytp.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: {
        login,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async verifyRefreshToken(refreshToken: string, login: string) {
    const user = await this.getByLogin(login);
    console.log(refreshToken);
    console.log(user);

    const isRefreshTokenMatching = await bcrytp.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
