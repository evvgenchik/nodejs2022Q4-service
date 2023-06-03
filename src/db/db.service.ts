import { Injectable } from '@nestjs/common';
import { UserDb } from './dbUsers';

@Injectable()
export class DbService {
  static users = new UserDb();
}
