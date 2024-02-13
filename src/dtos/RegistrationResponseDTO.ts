// dtos/RegistrationResponseDTO.ts
import { UserProps, RegistrationResponseDTO } from 'types/types';

export const buildRegistrationResponse = (
  user: UserProps
): RegistrationResponseDTO => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
};
