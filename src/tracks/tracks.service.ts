import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './dto/trackDto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TrackDto) {
    const track = await this.prisma.track.create({ data: { ...dto } });
    return track;
  }

  async getAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async get(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async update(id: string, dto: TrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = await this.prisma.track.update({
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
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma.track.delete({ where: { id } });
  }
}
