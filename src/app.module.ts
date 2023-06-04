import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    UsersModule,
    DbModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
  ],
})
export class AppModule {}
