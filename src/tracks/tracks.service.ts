import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { TrackDto } from './dto/trackDto';

@Injectable()
export class TracksService {
  constructor(private database: DbService) {}

  async create(dto: TrackDto) {
    const user = DbService.tracks.create(dto);
    return user;
  }
  async getAll() {
    return DbService.tracks.getAll();
  }
  async get(id: string) {
    return DbService.tracks.get(id);
  }
  async update(id: string, dto: TrackDto) {
    return DbService.tracks.update(id, dto);
  }
  async delete(id: string) {
    DbService.tracks.delete(id);
    DbService.favs.deleteScpecific(id, 'tracks');
  }
}
