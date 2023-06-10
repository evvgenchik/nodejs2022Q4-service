import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { DbService } from '../db/db.service';
import { UpdateUserDto } from './dto/updateUserDto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = DbService.users.create(dto);
    return user;
  }
  async getAll() {
    return this.prisma.user.findMany();
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
