import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { Track } from 'src/common/interfaces/track.interface';
import { DbService } from 'src/db/db.service';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.dbService.tracks.findMany();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.dbService.tracks.findUnique(id);

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create({
    name,
    duration,
    albumId,
    artistId,
  }: TrackDto): Promise<Track> {
    if (!name || !duration || !albumId || !artistId) {
      throw new BadRequestException(
        'Name, duration, artistId and albumId are required',
      );
    }

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
    const track = await this.findOne(id);
    if (track) {
      await this.dbService.tracks.delete(id);
    }
  }
}
