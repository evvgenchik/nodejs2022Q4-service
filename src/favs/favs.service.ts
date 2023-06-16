import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumEntity, ArtistEntity, TrackEntity } from './favEntety';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const favoriteAlbum = await this.prisma.favoriteAlbum.findMany({
      include: {
        album: true,
      },
    });
    const favoriteTraks = await this.prisma.favoriteTrack.findMany({
      include: {
        track: true,
      },
    });
    const favoriteArtist = await this.prisma.favoriteArtist.findMany({
      include: {
        artist: true,
      },
    });

    const albums = favoriteAlbum.map((el) =>
      plainToClass(AlbumEntity, el.album),
    );
    const tracks = favoriteTraks.map((el) =>
      plainToClass(TrackEntity, el.track),
    );
    const artists = favoriteArtist.map((el) =>
      plainToClass(ArtistEntity, el.artist),
    );

    return { albums: albums, tracks: tracks, artists: artists };
  }

  async add(id: string, dbKey: string, objKey: string, checkerKey: string) {
    const entety = await this.prisma[checkerKey].findUnique({
      where: { id },
    });

    if (!entety) {
      throw new UnprocessableEntityException('Entity not found');
    }

    const fav = await this.prisma[dbKey].create({
      data: { [objKey]: id },
    });

    return fav;
  }

  async delete(id: string, dbKey: string, objKey: string) {
    const favEntity = await this.prisma[dbKey].findUnique({
      where: { [objKey]: id },
    });

    if (!favEntity) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma[dbKey].delete({
      where: {
        [objKey]: id,
      },
    });
  }
}
