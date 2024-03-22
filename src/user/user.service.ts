import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { checkUuidError } from 'src/common/errors/checkUuidError';
import { checkNotFoundError } from 'src/common/errors/checkNotFoundError';
import { checkChangePassword } from 'src/common/errors/checkChangePassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dbService: PrismaService) {}

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string) {
    checkUuidError(id);

    const user = await this.dbService.user.findUnique({ where: { id } });

    checkNotFoundError({ entityName: 'User', entity: user });

    return new UserEntity(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.dbService.user.create({ data: createUserDto });
    return new UserEntity(user);
  }

  async updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    checkUuidError(id);

    const user = await this.dbService.user.findUnique({ where: { id } });
    const { oldPassword, newPassword } = updatePasswordDto;

    checkNotFoundError({ entityName: 'User', entity: user });

    checkChangePassword({ currentPassword: user.password, oldPassword });

    const updatedUser = await this.dbService.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });

    return new UserEntity(updatedUser);
  }

  async remove(id: string) {
    //TODO: double db request - findOne, delete
    const user = await this.findOne(id);
    if (user) {
      await this.dbService.user.delete({
        where: { id },
      });
    }
  }
}
