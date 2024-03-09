import { Injectable } from '@nestjs/common';
import { Album } from 'src/common/interfaces/album.interface';
import { DbService } from 'src/db/db.service';
import { AlbumDto } from './dto/album.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<Album[]> {
    const albums = await this.dbService.albums.findMany();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    checkUuidError(id);

    const album = await this.dbService.albums.findUnique(id);

    checkNotFoundError({ entityName: 'Album', entity: album });

    return album;
  }

  async create({ name, year, artistId }: AlbumDto): Promise<Album> {
    const newAlbum = await this.dbService.albums.create({
      name,
      year,
      artistId,
    });

    return newAlbum;
  }

  async update(id: string, updateAlbumDto: AlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    const updatedAlbum = await this.dbService.albums.update({
      ...album,
      ...updateAlbumDto,
    });

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.dbService.albums.delete(id);
  }
}
