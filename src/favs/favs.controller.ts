import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    const favs = await this.favsService.findAll();
    return favs;
  }

  @Post('/artist/:id')
  saveFavArtist(@Param('id') id: string) {
    return this.favsService.updateFavArtist(id);
  }

  @Delete('/artist/:id')
  removeFavArtist(@Param('id') id: string) {
    return this.favsService.removeFavArtist(id);
  }

  @Post('/album/:id')
  saveFavAlbum(@Param('id') id: string) {
    return this.favsService.updateFavAlbum(id);
  }

  @Delete('/album/:id')
  removeFavAlbum(@Param('id') id: string) {
    return this.favsService.removeFavAlbum(id);
  }

  @Post('/track/:id')
  saveFavTrack(@Param('id') id: string) {
    return this.favsService.updateFavTrack(id);
  }

  @Delete('/track/:id')
  removeFavTrack(@Param('id') id: string) {
    return this.favsService.removeFavTrack(id);
  }
}
