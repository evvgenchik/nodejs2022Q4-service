import { Injectable } from '@nestjs/common';
import { UserDb } from './users/dbUsers';

@Injectable()
export class DbService {
  static users = new UserDb();
}
