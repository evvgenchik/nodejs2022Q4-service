export class TrackEntity {
  id: string;
  name: string;
  grammy: boolean;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
