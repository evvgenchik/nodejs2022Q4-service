import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from './albumEntety';
import { AlbumDto } from 'src/albums/dto/albumDto';
import { DbService } from '../db.service';

export class AlbumsDb {
  private db = [];

  create(dto: AlbumDto) {
    const album = new AlbumEntity({
      id: uuidv4(),
      ...dto,
    });

    this.db.push(album);
    return album;
  }

  getAll() {
    return this.db;
  }

  get(id: string) {
    const album = this.db.find((el) => el.id === id);
    if (!album) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, newArtist) {
    const album = this.db.find((el) => el.id === id);

    if (!album) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    album.name = newArtist.name;
    album.artistId = newArtist.artistId;
    album.year = newArtist.year;
    return album;
  }

  delete(id: string) {
    const albumIndex = this.db.findIndex((el) => el.id === id);

    if (albumIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const traks = DbService.tracks.getAll();
    const tracksThisAlbum = traks.filter((el) => el.albumId === id);
    tracksThisAlbum.forEach((track) => {
      track.albumId = null;
      DbService.tracks.update(track.id, track);
    });

    this.db.splice(albumIndex, 1);
  }
}
