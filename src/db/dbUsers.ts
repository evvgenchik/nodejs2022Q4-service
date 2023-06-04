import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class UserDb {
  private db = {};

  create(value) {
    const id = uuidv4();
    const date = new Date();
    value['id'] = id;
    value['version'] = 0;
    value['createdAt'] = date;
    value['updatedAt'] = date;
    this.db[id] = value;
    return this.db[id];
  }

  getAll() {
    return this.db;
  }

  get(id: string) {
    const user = this.db[id];
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: string, newUser) {
    this.db[id] = newUser;
    const user = this.db[id];
    user['version'] = ++user.version;
    user['updatedAt'] = new Date();
    return user;
  }

  delete(id: string) {
    const user = this.db[id];
    delete this.db[id];
    return user;
  }
}
