// types.ts
export type postsProps = {
  title: string;
  description: string;
  author: string;
  published: boolean;
  isbn: string;
};

export type UserRole = 'Administrator' | 'Moderator' | 'User';

export type UserProps = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};
