import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.trackService.findOne(id);
  }

  @Post()
  async create(@Body() createTrackDto: TrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrackDto: TrackDto) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.trackService.remove(id);
  }
}
