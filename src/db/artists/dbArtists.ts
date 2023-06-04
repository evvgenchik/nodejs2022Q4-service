import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistEntity } from './artistEntety';
import { ArtistDto } from 'src/artists/dto/artistDto';

export class ArtistsDb {
  private db = [];

  create(dto: ArtistDto) {
    const artist = new ArtistEntity({
      id: uuidv4(),
      ...dto,
    });

    this.db.push(artist);
    return artist;
  }

  getAll() {
    return this.db;
  }

  get(id: string) {
    const artist = this.db.find((el) => el.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, newArtist) {
    const artist = this.db.find((el) => el.id === id);

    if (!artist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    artist.name = newArtist.name;
    artist.grammy = newArtist.grammy;
    return artist;
  }

  delete(id: string) {
    const artistIndex = this.db.findIndex((el) => el.id === id);

    if (artistIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.db.splice(artistIndex, 1);
  }
}
