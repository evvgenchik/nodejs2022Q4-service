import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artistDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ArtistDto) {
    const artist = await this.prisma.artist.create({ data: { ...dto } });
    return artist;
  }

  async getAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async get(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    return artist;
  }

  async update(id: string, dto: ArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    const updatedTrack = await this.prisma.artist.update({
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
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.artist.delete({ where: { id } });
  }
}
