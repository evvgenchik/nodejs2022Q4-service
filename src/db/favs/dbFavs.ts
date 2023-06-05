import { HttpException, HttpStatus } from '@nestjs/common';
import { FavEntity } from './favsEntety';

export class FavsDb {
  private db = new FavEntity();

  getAll() {
    return this.db;
  }

  add<T>(obj: T, key: string) {
    const dbArr = this.db[key];
    return dbArr.push(obj);
  }

  delete(id: string, key: string) {
    const dbArr = this.db[key];
    const trackIndex = dbArr.findIndex((el) => el.id === id);

    if (trackIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    dbArr.splice(trackIndex, 1);
  }

  deleteScpecific(id: string, key: string) {
    const dbArr = this.db[key];
    const deleteIndex = dbArr.findIndex((el) => el.id === id);

    dbArr.splice(deleteIndex, 1);
  }
}
