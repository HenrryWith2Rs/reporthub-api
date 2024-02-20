// dtos/LoginDTO.ts
import { UserProps, LoginResponseDTO } from 'types/types';

export const buildLoginResponse = (user: UserProps): LoginResponseDTO => {
  return {
    sub: user.userId,
    name: user.firstName,
    role: user.role,
  };
};
