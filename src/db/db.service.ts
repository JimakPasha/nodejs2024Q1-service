import { Injectable } from '@nestjs/common';
import { Album, NewAlbum } from 'src/common/interfaces/album.interface';
import { Artist, NewArtist } from 'src/common/interfaces/artist.interface';
import { NewTrack, Track } from 'src/common/interfaces/track.interface';
import {
  NewUser,
  UpdatedUser,
  User,
} from 'src/common/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  private usersDb: User[] = [];
  private artistsDb: Artist[] = [];
  private albumsDb: Album[] = [];
  private tracksDb: Track[] = [];

  get users() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
    };
  }

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

  private findUser = async (id: string) =>
    this.usersDb.find((user) => user.id === id);

  private findUsers = async () => this.usersDb;

  private createUser = async ({
    login,
    password,
    createdAt,
    updatedAt,
    version,
  }: NewUser) => {
    const user = {
      id: uuidv4(),
      login,
      password,
      createdAt,
      updatedAt,
      version,
    };
    this.usersDb.push(user);
    return user;
  };

  private updateUser = async ({
    id,
    login,
    password,
    updatedAt,
    version,
  }: UpdatedUser) => {
    const user = await this.users.findUnique(id);

    if (!user) return;

    const updatedUser = {
      ...user,
      login,
      password,
      updatedAt,
      version,
    };

    this.usersDb = this.usersDb.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  };

  private deleteUser = async (id: string) => {
    const user = await this.users.findUnique(id);

    if (!user) return;

    this.usersDb = this.usersDb.filter((user) => user.id !== id);
  };

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
  };
}
