import { BadRequestException } from '@nestjs/common';
import * as uuid from 'uuid';
import { errorMessages } from '../constants/errorMessages';

export const checkUuidError = (id: string) => {
  if (!uuid.validate(id)) {
    throw new BadRequestException(errorMessages.INVALID_UUID);
  }
};
