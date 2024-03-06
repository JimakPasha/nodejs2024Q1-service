import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { DbService } from 'src/db/db.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<Artist[]> {
    const artists = await this.dbService.artists.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.dbService.artists.findUnique(id);

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create({ name, grammy }: ArtistDto): Promise<Artist> {
    if (!name || !grammy) {
      throw new BadRequestException('Login and password are required');
    }

    const newArtist = await this.dbService.artists.create({
      name,
      grammy,
    });

    return newArtist;
  }

  async update(id: string, updateArtistDto: ArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    const updatedArtist = await this.dbService.artists.update({
      ...artist,
      ...updateArtistDto,
    });

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const artist = await this.findOne(id);
    if (artist) {
      await this.dbService.artists.delete(id);
    }
  }
}
