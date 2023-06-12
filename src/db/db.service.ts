import { Injectable } from '@nestjs/common';
import { ArtistsDb } from './artists/dbArtists';
import { TracksDb } from './traks/dbTracks';
import { AlbumsDb } from './albums/dbAlbums';
import { FavsDb } from './favs/dbFavs';

@Injectable()
export class DbService {
  static artists = new ArtistsDb();
  static tracks = new TracksDb();
  static albums = new AlbumsDb();
  static favs = new FavsDb();
}
