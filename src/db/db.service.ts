import { Injectable } from '@nestjs/common';
import { UsersDb } from './users/dbUsers';
import { ArtistsDb } from './artists/dbArtists';
import { TracksDb } from './traks/dbTracks';
import { AlbumsDb } from './albums/dbAlbums';
import { FavsDb } from './favs/dbFavs';

@Injectable()
export class DbService {
  static users = new UsersDb();
  static artists = new ArtistsDb();
  static tracks = new TracksDb();
  static albums = new AlbumsDb();
  static favs = new FavsDb();
}
