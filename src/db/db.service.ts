import { Injectable } from '@nestjs/common';
import {
  NewUser,
  UpdatedUser,
  User,
} from 'src/common/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  private usersDb: User[] = [];

  get users() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
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
}
