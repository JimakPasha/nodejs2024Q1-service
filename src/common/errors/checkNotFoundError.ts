import { NotFoundException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages';
import { User } from '../interfaces/user.interface';
import { Album } from '../interfaces/album.interface';
import { Artist } from '../interfaces/artist.interface';
import { Track } from '../interfaces/track.interface';

interface CheckNotFoundErrorProps {
  entityName: string;
  entity: User | Artist | Album | Track | boolean;
}

export const checkNotFoundError = ({
  entityName,
  entity,
}: CheckNotFoundErrorProps) => {
  if (!entity) {
    throw new NotFoundException(errorMessages.ENTITIY_NOT_FOUND(entityName));
  }
};
