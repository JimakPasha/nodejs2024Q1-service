import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    return await this.dbService.artist.findMany();
  }

  async findOne(id: string) {
    checkUuidError(id);

    const artist = await this.dbService.artist.findUnique({ where: { id } });

    checkNotFoundError({ entityName: 'Artist', entity: artist });

    return artist;
  }

  async create(artistDto: ArtistDto) {
    return await this.dbService.artist.create({ data: artistDto });
  }

  async update(id: string, updateArtistDto: ArtistDto) {
    //TODO:
    await this.findOne(id);

    return await this.dbService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    TODO: await this.findOne(id);
    await this.dbService.artist.delete({ where: { id } });
  }
}
