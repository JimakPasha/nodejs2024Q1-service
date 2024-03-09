import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseUser } from 'src/common/interfaces/user.interface';
import { DbService } from 'src/db/db.service';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { checkChangePassword } from 'src/common/errors/checkChangePassword';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async findAll(): Promise<ResponseUser[]> {
    const users = await this.dbService.users.findMany();
    return users.map(({ id, createdAt, login, updatedAt, version }) => ({
      id,
      createdAt,
      login,
      updatedAt,
      version,
    }));
  }

  async findOne(id: string): Promise<ResponseUser> {
    checkUuidError(id);

    const user = await this.dbService.users.findUnique(id);

    checkNotFoundError({ entityName: 'User', entity: user });

    const { id: idUser, login, createdAt, updatedAt, version } = user;

    return { id: idUser, login, createdAt, updatedAt, version };
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseUser> {
    const { id, login, createdAt, updatedAt, version } =
      await this.dbService.users.create({
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

    return { login, createdAt, updatedAt, version, id };
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<ResponseUser> {
    checkUuidError(id);

    const user = await this.dbService.users.findUnique(id);
    const { oldPassword, newPassword } = updatePasswordDto;

    checkNotFoundError({ entityName: 'User', entity: user });

    checkChangePassword({ currentPassword: user.password, oldPassword });

    const updatedUser = await this.dbService.users.update({
      id,
      login: user.login,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return {
      id,
      createdAt: updatedUser.createdAt,
      login: updatedUser.login,
      version: updatedUser.version,
      updatedAt: updatedUser.updatedAt,
    };
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await this.dbService.users.delete(id);
    }
  }
}
