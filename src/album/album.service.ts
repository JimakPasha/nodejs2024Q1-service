import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { Album } from 'src/common/interfaces/album.interface';
import { DbService } from 'src/db/db.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<Album[]> {
    const albums = await this.dbService.albums.findMany();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.dbService.albums.findUnique(id);

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create({ name, year, artistId }: AlbumDto): Promise<Album> {
    if (!name || !year || !artistId) {
      throw new BadRequestException('Name year and artistId are required');
    }

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
    const album = await this.findOne(id);
    if (album) {
      await this.dbService.albums.delete(id);
    }
  }
}
