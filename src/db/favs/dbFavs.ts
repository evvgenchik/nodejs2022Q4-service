import { HttpException, HttpStatus } from '@nestjs/common';
import { FavEntity } from './favsEntety';
import { DbService } from '../db.service';

export class FavsDb {
  private db = new FavEntity();

  getAll() {
    const { db } = this;
    const dbKeys = Object.keys(db);
    const result = new FavEntity();

    dbKeys.map((key) => {
      result[key] = db[key].map((id: string) => {
        return DbService[key].get(id);
      });
    });

    return result;
  }

  add(id: string, key: string) {
    const dbArr = this.db[key];
    return dbArr.push(id);
  }

  delete(id: string, key: string) {
    const dbArr = this.db[key];
    const trackIndex = dbArr.findIndex((idElem: string) => idElem === id);

    if (trackIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    dbArr.splice(trackIndex, 1);
  }

  deleteScpecific(id: string, key: string) {
    const dbArr = this.db[key];
    const deleteIndex = dbArr.findIndex((idElem: string) => idElem === id);

    dbArr.splice(deleteIndex, 1);
  }
}
