import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { checkUnprocessableEntity } from 'src/common/errors/checkUnprocessableEntity';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.dbService.favArtists.findMany(),
      this.dbService.favAlbums.findMany(),
      this.dbService.favTracks.findMany(),
    ]);

    return { artists, albums, tracks };
  }

  async updateFavArtist(id: string) {
    checkUuidError(id);

    const favArtist = await this.dbService.favArtists.create(id);

    checkUnprocessableEntity({ entityName: 'Artist', entity: favArtist });

    return favArtist;
  }

  async removeFavArtist(id: string) {
    checkUuidError(id);

    const favArtist = await this.dbService.favArtists.delete(id);

    checkNotFoundError({ entityName: 'Artist', entity: favArtist });
  }

  async updateFavAlbum(id: string) {
    checkUuidError(id);

    const favAlbum = await this.dbService.favAlbums.create(id);

    checkUnprocessableEntity({ entityName: 'Album', entity: favAlbum });

    return favAlbum;
  }

  async removeFavAlbum(id: string) {
    checkUuidError(id);

    const favAlbum = await this.dbService.favAlbums.delete(id);

    checkNotFoundError({ entityName: 'Album', entity: favAlbum });
  }

  async updateFavTrack(id: string) {
    checkUuidError(id);

    const favTrack = await this.dbService.favTracks.create(id);

    checkUnprocessableEntity({ entityName: 'Track', entity: favTrack });

    return favTrack;
  }

  async removeFavTrack(id: string) {
    checkUuidError(id);

    const favTrack = await this.dbService.favTracks.delete(id);

    checkNotFoundError({ entityName: 'Track', entity: favTrack });
  }
}
