import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [PrismaModule],
})
export class AlbumsModule {}
