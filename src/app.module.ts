import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
})
export class AppModule {}
