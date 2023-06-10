import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ArtistDto } from './dto/artistDto';

@Injectable()
export class ArtistsService {
  constructor(private database: DbService) {}

  async create(dto: ArtistDto) {
    const user = DbService.artists.create(dto);
    return user;
  }
  async getAll() {
    return DbService.artists.getAll();
  }
  async get(id: string) {
    return DbService.artists.get(id);
  }
  async update(id: string, dto: ArtistDto) {
    return DbService.artists.update(id, dto);
  }
  async delete(id: string) {
    DbService.artists.delete(id);
    DbService.tracks.updateScpecific(id, 'artistId');
    DbService.albums.updateScpecific(id, 'artistId');
    DbService.favs.deleteScpecific(id, 'artists');
  }
}
