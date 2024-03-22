import { Injectable } from '@nestjs/common';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { checkUnprocessableEntity } from 'src/common/errors/checkUnprocessableEntity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    const favorite = await this.dbService.favorite.findFirst();
    if (!favorite) {
      return { artists: [], albums: [], tracks: [] };
    }

    const [artists, albums, tracks] = await Promise.all([
      this.dbService.artist.findMany({
        where: { id: { in: favorite.artists } },
      }),
      this.dbService.album.findMany({
        where: { id: { in: favorite.albums } },
      }),
      this.dbService.track.findMany({
        where: { id: { in: favorite.tracks } },
      }),
    ]);

    return { artists, albums, tracks };
  }

  async updateFavArtist(id: string) {
    // TODO: refactor duplicates code
    checkUuidError(id);

    const isExistsEntity = !!(await this.dbService.artist.findUnique({
      where: { id },
    }));
    checkUnprocessableEntity({ entityName: 'Artist', isExistsEntity });

    const favorite = await this.dbService.favorite.findFirst();
    if (favorite) {
      return await this.dbService.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: {
          artists: {
            set: [...favorite.artists, id],
          },
        },
      });
    } else {
      return await this.dbService.favorite.create({
        data: { artists: [id], albums: [], tracks: [] },
      });
    }
  }

  async removeFavArtist(id: string) {
    checkUuidError(id);

    const favorite = await this.dbService.favorite.findFirst();

    const favArtist = await this.dbService.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        artists: {
          set: favorite.artists.filter((artistId) => artistId !== id),
        },
      },
    });

    checkNotFoundError({ entityName: 'Artist', entity: favArtist });
  }

  async updateFavAlbum(id: string) {
    // TODO: refactor duplicates code
    checkUuidError(id);

    const isExistsEntity = !!(await this.dbService.album.findUnique({
      where: { id },
    }));
    checkUnprocessableEntity({ entityName: 'Artist', isExistsEntity });

    const favorite = await this.dbService.favorite.findFirst();
    if (favorite) {
      return await this.dbService.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: {
          albums: {
            set: [...favorite.albums, id],
          },
        },
      });
    } else {
      return await this.dbService.favorite.create({
        data: { artists: [], albums: [id], tracks: [] },
      });
    }
  }

  async removeFavAlbum(id: string) {
    checkUuidError(id);

    const favorite = await this.dbService.favorite.findFirst();

    const favAlbum = await this.dbService.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        albums: {
          set: favorite.albums.filter((albumId) => albumId !== id),
        },
      },
    });

    checkNotFoundError({ entityName: 'Album', entity: favAlbum });
  }

  async updateFavTrack(id: string) {
    // TODO: refactor duplicates code
    checkUuidError(id);

    const isExistsEntity = !!(await this.dbService.track.findUnique({
      where: { id },
    }));
    checkUnprocessableEntity({ entityName: 'Artist', isExistsEntity });

    const favorite = await this.dbService.favorite.findFirst();
    if (favorite) {
      return await this.dbService.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: {
          tracks: {
            set: [...favorite.tracks, id],
          },
        },
      });
    } else {
      return await this.dbService.favorite.create({
        data: { artists: [], albums: [], tracks: [id] },
      });
    }
  }

  async removeFavTrack(id: string) {
    checkUuidError(id);

    const favorite = await this.dbService.favorite.findFirst();

    const favTrack = await this.dbService.favorite.update({
      where: { favoriteId: favorite.favoriteId },
      data: {
        tracks: {
          set: favorite.tracks.filter((trackId) => trackId !== id),
        },
      },
    });

    checkNotFoundError({ entityName: 'Track', entity: favTrack });
  }
}
