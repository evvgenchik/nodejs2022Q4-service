import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private database: DbService) {}
  async createUser(dto: CreateUserDto) {
    const user = DbService.users.create(dto);
    return user;
  }
  async getAllUsers() {
    return DbService.users.getAll();
  }
}
