import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    return await this.dbService.track.findMany();
  }

  async findOne(id: string) {
    checkUuidError(id);

    const track = await this.dbService.track.findUnique({ where: { id } });

    checkNotFoundError({ entityName: 'Track', entity: track });

    return track;
  }

  async create(trackDto: TrackDto) {
    return await this.dbService.track.create({ data: trackDto });
  }

  async update(id: string, updateTrackDto: TrackDto) {
    //TODO:
    await this.findOne(id);
    return await this.dbService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    //TODO:
    await this.findOne(id);
    await this.dbService.track.delete({ where: { id } });
  }
}
