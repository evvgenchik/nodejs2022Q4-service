import { Exclude } from 'class-transformer';

export class AlbumEntity {
  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  albumId: string;
}

export class ArtistEntity {
  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  artistId: string;
}

export class TrackEntity {
  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  trackId: string;
}
