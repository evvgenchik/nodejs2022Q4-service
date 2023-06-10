import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AlbumDto } from './dto/albumDto';

@Injectable()
export class AlbumsService {
  constructor(private database: DbService) {}

  async create(dto: AlbumDto) {
    const user = DbService.albums.create(dto);
    return user;
  }
  async getAll() {
    return DbService.albums.getAll();
  }
  async get(id: string) {
    return DbService.albums.get(id);
  }
  async update(id: string, dto: AlbumDto) {
    return DbService.albums.update(id, dto);
  }
  async delete(id: string) {
    DbService.albums.delete(id);
    DbService.tracks.updateScpecific(id, 'albumId');
    DbService.favs.deleteScpecific(id, 'albums');
  }
}
