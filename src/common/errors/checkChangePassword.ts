import { ForbiddenException } from '@nestjs/common';
import { errorMessages } from '../constants/errorMessages';

interface CheckChangePasswordProps {
  currentPassword: string;
  oldPassword: string;
}

export const checkChangePassword = ({
  currentPassword,
  oldPassword,
}: CheckChangePasswordProps) => {
  if (currentPassword !== oldPassword) {
    throw new ForbiddenException(errorMessages.OLD_PASSWORD_WRONG);
  }
};
