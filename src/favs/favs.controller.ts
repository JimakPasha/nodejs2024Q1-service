import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
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
  @HttpCode(204)
  removeFavArtist(@Param('id') id: string) {
    return this.favsService.removeFavArtist(id);
  }

  @Post('/album/:id')
  saveFavAlbum(@Param('id') id: string) {
    return this.favsService.updateFavAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeFavAlbum(@Param('id') id: string) {
    return this.favsService.removeFavAlbum(id);
  }

  @Post('/track/:id')
  saveFavTrack(@Param('id') id: string) {
    return this.favsService.updateFavTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeFavTrack(@Param('id') id: string) {
    return this.favsService.removeFavTrack(id);
  }
}
