import { AlbumEntity } from '../albums/albumEntety';
import { ArtistEntity } from '../artists/artistEntety';
import { TrackEntity } from '../traks/tracksEntety';

export class FavEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  //  constructor(partial: Partial<ArtistEntity>) {
  //   Object.assign(this, partial);
  // }
}
