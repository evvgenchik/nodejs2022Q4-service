import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private database: DbService) {}

  async getAll() {
    return DbService.favs.getAll();
  }

  async add<T>(obj: T, dbKey: string) {
    const data = DbService.favs.add<T>(obj, dbKey);
    return data;
  }

  async delete(id: string, dbKey: string) {
    DbService.favs.delete(id, dbKey);
  }
}
