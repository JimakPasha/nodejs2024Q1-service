import { UnprocessableEntityException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages';

interface CheckUnprocessableEntityProps {
  entityName: string;
  isExistsEntity: boolean;
}

export const checkUnprocessableEntity = ({
  entityName,
  isExistsEntity,
}: CheckUnprocessableEntityProps) => {
  if (!isExistsEntity) {
    throw new UnprocessableEntityException(
      errorMessages.ENTITIY_NOT_FOUND(entityName),
    );
  }
};
