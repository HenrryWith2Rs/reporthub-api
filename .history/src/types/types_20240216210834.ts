// types.ts
export type PostProps = {
  title: string;
  description: string;
  author: string;
  published: boolean;
  isbn: string;
};

export type UserRole = 'Administrator' | 'Moderator' | 'User';

export type UserProps = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  role: UserRole;
};

export type RegistrationResponseDTO = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export type QueryItem = {
  Description: string;
  Result: number | string;
  Cell_Result: string;
  Percentage: number | string;
  Cell_Percentage: string;
  Intent: string;
  Order: number;
};
