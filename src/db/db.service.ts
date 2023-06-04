import { Injectable } from '@nestjs/common';
import { UsersDb } from './users/dbUsers';
import { ArtistsDb } from './artists/dbArtists';
import { TracksDb } from './traks/dbTracks';

@Injectable()
export class DbService {
  static users = new UsersDb();
  static artists = new ArtistsDb();
  static tracks = new TracksDb();
}
