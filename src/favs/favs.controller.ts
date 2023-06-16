import {
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavsService } from './favs.service';

const DB_KEYS = {
  tracks: 'FavoriteTrack',
  albums: 'FavoriteAlbum',
  artists: 'FavoriteArtist',
};

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavsController {
  constructor(private favsService: FavsService) {}
  @Get('')
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, DB_KEYS.tracks, 'trackId', 'track');
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.tracks, 'trackId');
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, DB_KEYS.albums, 'albumId', 'album');
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.albums, 'albumId');
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, DB_KEYS.artists, 'artistId', 'artist');
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.delete(id, DB_KEYS.artists, 'artistId');
  }
}
