import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private database: DbService) {}

  async getAll() {
    return DbService.favs.getAll();
  }

  async add(id: string, dbKey: string) {
    const data = DbService.favs.add(id, dbKey);
    return data;
  }

  async delete(id: string, dbKey: string) {
    DbService.favs.delete(id, dbKey);
  }
}
