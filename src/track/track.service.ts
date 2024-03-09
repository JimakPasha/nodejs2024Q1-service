import { Injectable } from '@nestjs/common';
import { Track } from 'src/common/interfaces/track.interface';
import { DbService } from 'src/db/db.service';
import { TrackDto } from './dto/track.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.dbService.tracks.findMany();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    checkUuidError(id);

    const track = await this.dbService.tracks.findUnique(id);

    checkNotFoundError({ entityName: 'Track', entity: track });

    return track;
  }

  async create({
    name,
    duration,
    albumId,
    artistId,
  }: TrackDto): Promise<Track> {
    const newTrack = await this.dbService.tracks.create({
      name,
      duration,
      albumId,
      artistId,
    });

    return newTrack;
  }

  async update(id: string, updateTrackDto: TrackDto): Promise<Track> {
    const track = await this.findOne(id);
    const updatedTrack = await this.dbService.tracks.update({
      ...track,
      ...updateTrackDto,
    });

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.dbService.tracks.delete(id);
  }
}
