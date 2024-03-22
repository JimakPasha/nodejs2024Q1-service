import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    return await this.dbService.album.findMany();
  }

  async findOne(id: string) {
    checkUuidError(id);

    const album = await this.dbService.album.findUnique({ where: { id } });

    checkNotFoundError({ entityName: 'Album', entity: album });

    return album;
  }

  async create(albumDto: AlbumDto) {
    return await this.dbService.album.create({ data: albumDto });
  }

  async update(id: string, albumDto: AlbumDto) {
    // TODO:
    await this.findOne(id);
    return await this.dbService.album.update({
      where: { id },
      data: albumDto,
    });
  }

  async remove(id: string) {
    //TODO:
    await this.findOne(id);
    await this.dbService.album.delete({ where: { id } });
  }
}
