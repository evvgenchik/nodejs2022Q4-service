import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { DbService } from '../db/db.service';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(private database: DbService) {}

  async create(dto: CreateUserDto) {
    const user = DbService.users.create(dto);
    return user;
  }
  async getAll() {
    return DbService.users.getAll();
  }
  async get(id: string) {
    return DbService.users.get(id);
  }
  async update(id: string, dto: UpdateUserDto) {
    return DbService.users.update(id, dto);
  }
  async delete(id: string) {
    DbService.users.delete(id);
  }
}
