import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/albumDto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: AlbumDto) {
    const album = await this.prisma.album.create({ data: { ...dto } });
    return album;
  }

  async getAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async get(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, dto: AlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedTrack = await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return updatedTrack;
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.prisma.album.delete({ where: { id } });
  }
}
