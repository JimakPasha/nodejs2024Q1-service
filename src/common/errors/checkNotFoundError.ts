import { NotFoundException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages';
import { Album, Artist, Track, User, Favorite } from '@prisma/client';

interface CheckNotFoundErrorProps {
  entityName: string;
  entity: User | Artist | Album | Track | Favorite | boolean;
}

export const checkNotFoundError = ({
  entityName,
  entity,
}: CheckNotFoundErrorProps) => {
  if (!entity) {
    throw new NotFoundException(errorMessages.ENTITIY_NOT_FOUND(entityName));
  }
};
