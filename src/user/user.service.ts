import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResponseUser } from 'src/common/interfaces/user.interface';
import { DbService } from 'src/db/db.service';

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
    const user = await this.dbService.users.findUnique(id);

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseUser> {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }

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
    const user = await this.dbService.users.findUnique(id);
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

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
    const user = await this.dbService.users.findUnique(id);
    await this.dbService.users.delete(id);

    if (!uuid.validate(id)) {
      throw new BadRequestException('Invalid id. Please provide a valid UUID.');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
