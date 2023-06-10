import { AlbumEntity } from '../../db/albums/albumEntety';
import { ArtistEntity } from '../../db/artists/artistEntety';
import { TrackEntity } from '../../db/traks/tracksEntety';

export class TrackDto {
  readonly tracks: TrackEntity[]; // refers to Artist
  readonly albums: AlbumEntity[]; // refers to Album
  readonly artists: ArtistEntity[]; // integer number
}
