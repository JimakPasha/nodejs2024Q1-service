import { UnprocessableEntityException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages';
import { Artist } from '../interfaces/artist.interface';
import { Album } from '../interfaces/album.interface';
import { Track } from '../interfaces/track.interface';

interface CheckUnprocessableEntityProps {
  entityName: string;
  entity: Artist | Album | Track;
}

export const checkUnprocessableEntity = ({
  entityName,
  entity,
}: CheckUnprocessableEntityProps) => {
  if (!entity) {
    throw new UnprocessableEntityException(
      errorMessages.ENTITIY_NOT_FOUND(entityName),
    );
  }
};
