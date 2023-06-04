import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from './tracksEntety';
import { TrackDto } from 'src/tracks/dto/trackDto';

export class TracksDb {
  private db = [];

  create(dto: TrackDto) {
    const track = new TrackEntity({
      id: uuidv4(),
      ...dto,
    });

    this.db.push(track);
    return track;
  }

  getAll() {
    return this.db;
  }

  get(id: string) {
    const track = this.db.find((el) => el.id === id);
    if (!track) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, newArtist) {
    const track = this.db.find((el) => el.id === id);

    if (!track) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    track.name = newArtist.name;
    track.grammy = newArtist.grammy;
    return track;
  }

  delete(id: string) {
    const trackIndex = this.db.findIndex((el) => el.id === id);

    if (trackIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.db.splice(trackIndex, 1);
  }

  updateAlbums(id: string) {
    const tracksThisAlbum = this.db.filter((el) => el.albumId === id);
    tracksThisAlbum.forEach((track) => {
      track.albumId = null;
      this.update(track.id, track);
    });
  }
}
