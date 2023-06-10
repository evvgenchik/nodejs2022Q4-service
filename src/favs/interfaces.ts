import { AlbumEntity } from '../db/albums/albumEntety';
import { TrackEntity } from '../db/traks/tracksEntety';
import { UserEntity } from '../db/users/userEntety';

interface DbFavs {
  artists: UserEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

export default DbFavs;
