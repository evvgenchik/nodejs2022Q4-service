import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './userEntety';
import { CreateUserDto } from 'src/users/dto/createUserDto';

export class UserDb {
  private db = [];

  create(dto: CreateUserDto) {
    const date = new Date();
    const user = new UserEntity({
      id: uuidv4(),
      version: 1,
      createdAt: +date,
      updatedAt: +date,
      password: dto.password,
      login: dto.login,
    });

    this.db.push(user);
    return user;
  }

  getAll() {
    return this.db;
  }

  get(id: string) {
    const user = this.db.find((el) => el.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, newUser) {
    const user = this.db.find((el) => el.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== newUser.oldPassword) {
      throw new HttpException('Old password incorrect', HttpStatus.FORBIDDEN);
    }

    user.password = newUser.newPassword;
    user.version = ++user.version;
    user.updatedAt = +new Date();
    return user;
  }

  delete(id: string) {
    const userIndex = this.db.findIndex((el) => el.id === id);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.db.splice(userIndex, 1);
  }
}
