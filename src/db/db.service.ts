import { Injectable } from '@nestjs/common';
import { Album, NewAlbum } from 'src/common/interfaces/album.interface';
import { Artist, NewArtist } from 'src/common/interfaces/artist.interface';
import { NewTrack, Track } from 'src/common/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  private artistsDb: Artist[] = [];
  private albumsDb: Album[] = [];
  private tracksDb: Track[] = [];
  private favArtistsDb: string[] = [];
  private favAlbumsDb: string[] = [];
  private favTracksDb: string[] = [];

  get artists() {
    return {
      findUnique: this.findArtist,
      findMany: this.findArtists,
      create: this.createArtist,
      update: this.updateArtist,
      delete: this.deleteArtist,
    };
  }

  get albums() {
    return {
      findUnique: this.findAlbum,
      findMany: this.findAlbums,
      create: this.createAlbum,
      update: this.updateAlbum,
      delete: this.deleteAlbum,
    };
  }

  get tracks() {
    return {
      findUnique: this.findTrack,
      findMany: this.findTracks,
      create: this.createTrack,
      update: this.updateTrack,
      delete: this.deleteTrack,
    };
  }

  get favArtists() {
    return {
      findMany: this.findFavArtists,
      create: this.saveFavArtist,
      delete: this.deleteFavArtist,
    };
  }

  get favAlbums() {
    return {
      findMany: this.findFavAlbums,
      create: this.saveFavAlbum,
      delete: this.deleteFavAlbum,
    };
  }

  get favTracks() {
    return {
      findMany: this.findFavTracks,
      create: this.saveFavTrack,
      delete: this.deleteFavTrack,
    };
  }

  private findArtist = async (id: string) =>
    this.artistsDb.find((artist) => artist.id === id);

  private findArtists = async () => this.artistsDb;

  private createArtist = async ({ name, grammy }: NewArtist) => {
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artistsDb.push(artist);
    return artist;
  };

  private updateArtist = async ({ id, name, grammy }: Artist) => {
    const artist = await this.artists.findUnique(id);

    if (!artist) return;

    const updatedArtist = {
      ...artist,
      name,
      grammy,
    };

    this.artistsDb = this.artistsDb.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );

    return updatedArtist;
  };

  private deleteArtist = async (id: string) => {
    const artist = await this.artists.findUnique(id);

    if (!artist) return;

    this.artistsDb = this.artistsDb.filter((artist) => artist.id !== id);
    this.albumsDb = this.albumsDb.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );
    this.tracksDb = this.tracksDb.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );
    this.favArtistsDb = this.favArtistsDb.filter(
      (fafArtistId) => fafArtistId !== id,
    );
  };

  private findAlbum = async (id: string) =>
    this.albumsDb.find((album) => album.id === id);

  private findAlbums = async () => this.albumsDb;

  private createAlbum = async ({ name, year, artistId }: NewAlbum) => {
    const album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albumsDb.push(album);
    return album;
  };

  private updateAlbum = async ({ id, name, year, artistId }: Album) => {
    const album = await this.albums.findUnique(id);

    if (!album) return;

    const updatedAlbum = {
      ...album,
      name,
      year,
      artistId,
    };

    this.albumsDb = this.albumsDb.map((album) =>
      album.id === id ? updatedAlbum : album,
    );

    return updatedAlbum;
  };

  private deleteAlbum = async (id: string) => {
    const album = await this.albums.findUnique(id);

    if (!album) return;

    this.albumsDb = this.albumsDb.filter((album) => album.id !== id);
    this.tracksDb = this.tracksDb.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );
    this.favAlbumsDb = this.favAlbumsDb.filter(
      (fafAlbumId) => fafAlbumId !== id,
    );
  };

  private findTrack = async (id: string) =>
    this.tracksDb.find((track) => track.id === id);

  private findTracks = async () => this.tracksDb;

  private createTrack = async ({
    name,
    duration,
    artistId,
    albumId,
  }: NewTrack) => {
    const track = {
      id: uuidv4(),
      name,
      duration,
      artistId,
      albumId,
    };
    this.tracksDb.push(track);
    return track;
  };

  private updateTrack = async ({
    id,
    name,
    duration,
    artistId,
    albumId,
  }: Track) => {
    const track = await this.tracks.findUnique(id);

    if (!track) return;

    const updatedTrack = {
      ...track,
      name,
      duration,
      artistId,
      albumId,
    };

    this.tracksDb = this.tracksDb.map((track) =>
      track.id === id ? updatedTrack : track,
    );

    return updatedTrack;
  };

  private deleteTrack = async (id: string) => {
    const track = await this.tracks.findUnique(id);

    if (!track) return;

    this.tracksDb = this.tracksDb.filter((track) => track.id !== id);
    this.favTracksDb = this.favTracksDb.filter(
      (fafTrackId) => fafTrackId !== id,
    );
  };

  private findFavArtists = async () => {
    return this.favArtistsDb.reduce((favArtists, id) => {
      const artist = this.artistsDb.find((artistEl) => artistEl.id === id);
      if (artist) favArtists.push(artist);
      return favArtists;
    }, []);
  };

  private saveFavArtist = async (id: string) => {
    this.favArtistsDb.push(id);
    return this.artists.findUnique(id);
  };

  private deleteFavArtist = async (id: string) => {
    const artist = this.favArtistsDb.find((favArtistId) => favArtistId === id);
    if (!artist) return;

    this.favArtistsDb = this.favArtistsDb.filter(
      (favArtistId) => favArtistId !== id,
    );
    return true;
  };

  private findFavAlbums = async () => {
    return this.favAlbumsDb.reduce((favAlbums, id) => {
      const album = this.albumsDb.find((albumEl) => albumEl.id === id);
      if (album) favAlbums.push(album);
      return favAlbums;
    }, []);
  };

  private saveFavAlbum = async (id: string) => {
    this.favAlbumsDb.push(id);
    return this.albums.findUnique(id);
  };

  private deleteFavAlbum = async (id: string) => {
    const album = this.favAlbumsDb.find((favAlbumId) => favAlbumId === id);
    if (!album) return;

    this.favAlbumsDb = this.favAlbumsDb.filter(
      (favAlbumId) => favAlbumId !== id,
    );

    return true;
  };

  private findFavTracks = async () => {
    return this.favTracksDb.reduce((favTracks, id) => {
      const track = this.tracksDb.find((trackEl) => trackEl.id === id);
      if (track) favTracks.push(track);
      return favTracks;
    }, []);
  };

  private saveFavTrack = async (id: string) => {
    this.favTracksDb.push(id);
    return this.tracks.findUnique(id);
  };

  private deleteFavTrack = async (id: string) => {
    const track = this.favTracksDb.find((favTrackId) => favTrackId === id);
    if (!track) return;

    this.favTracksDb = this.favTracksDb.filter(
      (favTrackId) => favTrackId !== id,
    );

    return true;
  };
}
