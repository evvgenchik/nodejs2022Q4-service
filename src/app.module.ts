import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    UsersModule,
    DbModule,
    ArtistsModule,
    TracksModule,
  ],
})
export class AppModule {}
