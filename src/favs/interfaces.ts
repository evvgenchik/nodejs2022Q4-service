import { AlbumEntity } from 'src/db/albums/albumEntety';
import { TrackEntity } from 'src/db/traks/tracksEntety';
import { UserEntity } from 'src/db/users/userEntety';

interface DbFavs {
  artists: UserEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

export default DbFavs;
