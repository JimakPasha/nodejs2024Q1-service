import { Injectable } from '@nestjs/common';
import { Artist, NewArtist } from 'src/common/interfaces/artist.interface';
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

  private findUser = async (id: string): Promise<User | undefined> =>
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
    const user = this.usersDb.find((user) => user.id === id);

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
    const user = this.usersDb.find((user) => user.id === id);

    if (!user) return;

    this.usersDb = this.usersDb.filter((user) => user.id !== id);
  };

  private findArtist = async (id: string): Promise<Artist | undefined> =>
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
    const artist = this.artistsDb.find((artist) => artist.id === id);

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
    const user = this.artistsDb.find((artist) => artist.id === id);

    if (!user) return;

    this.artistsDb = this.artistsDb.filter((artist) => artist.id !== id);
  };
}
