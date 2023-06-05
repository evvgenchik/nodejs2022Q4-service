import { AlbumEntity } from 'src/db/albums/albumEntety';
import { ArtistEntity } from 'src/db/artists/artistEntety';
import { TrackEntity } from 'src/db/traks/tracksEntety';

export class TrackDto {
  readonly tracks: TrackEntity[]; // refers to Artist
  readonly albums: AlbumEntity[]; // refers to Album
  readonly artists: ArtistEntity[]; // integer number
}
