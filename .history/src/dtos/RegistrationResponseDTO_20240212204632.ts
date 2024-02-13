// dtos/RegistrationResponseDTO.ts
import { UserProps, RegistrationResponseDTO } from 'types/types';

export function buildRegistrationResponse(
  user: UserProps,
  token: string
): RegistrationResponseDTO {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token: token,
  };
}
