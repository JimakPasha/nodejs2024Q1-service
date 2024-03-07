import {
  BadRequestException,
  UnprocessableEntityException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { Fav } from 'src/common/interfaces/fav.interface';
import { DbService } from 'src/db/db.service';

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
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    const favArtist = await this.dbService.favArtists.create(id);

    if (!favArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return favArtist;
  }

  async removeFavArtist(id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }
    const favArtist = await this.dbService.favArtists.delete(id);

    if (!favArtist) {
      throw new NotFoundException('Artist not found');
    }
  }

  async updateFavAlbum(id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    const favAlbum = await this.dbService.favAlbums.create(id);

    if (!favAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }

    return favAlbum;
  }

  async removeFavAlbum(id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }
    const favAlbum = await this.dbService.favAlbums.delete(id);

    if (!favAlbum) {
      throw new NotFoundException('Album not found');
    }
  }

  async updateFavTrack(id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    const favTrack = await this.dbService.favTracks.create(id);

    if (!favTrack) {
      throw new UnprocessableEntityException('Track not found');
    }

    return favTrack;
  }

  async removeFavTrack(id: string) {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }
    const favAlbum = await this.dbService.favTracks.delete(id);

    if (!favAlbum) {
      throw new NotFoundException('Track not found');
    }
  }
}
