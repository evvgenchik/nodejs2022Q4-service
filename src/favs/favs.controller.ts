import {
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { DbService } from 'src/db/db.service';
import { TrackEntity } from 'src/db/traks/tracksEntety';
import { AlbumEntity } from 'src/db/albums/albumEntety';
import { ArtistEntity } from 'src/db/artists/artistEntety';

const DB_KEYS = {
  tracks: 'tracks',
  albums: 'albums',
  artists: 'artists',
};

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}
  @Get('')
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const track = DbService.tracks.get(id);
      return this.favsService.add<TrackEntity>(track, DB_KEYS.tracks);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Forbidden', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw error;
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.tracks);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const album = DbService.albums.get(id);
      return this.favsService.add<AlbumEntity>(album, DB_KEYS.albums);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Forbidden', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw error;
    }
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.albums);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const artist = DbService.artists.get(id);
      return this.favsService.add<ArtistEntity>(artist, DB_KEYS.artists);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Forbidden', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw error;
    }
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.artists);
  }
}
