// dtos/LoginDTO.ts
import { UserProps, LoginResponseDTO } from 'types/commonTypes';

export const buildLoginResponse = (user: UserProps): LoginResponseDTO => {
  return {
    sub: user.userId,
    name: user.firstName,
    role: user.role,
  };
};
