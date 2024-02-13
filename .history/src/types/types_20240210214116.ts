// types.ts
export type PostsProps = {
  title: string;
  description: string;
  author: string;
  published: boolean;
  isbn: string;
};

type UserRole = 'Administrator' | 'Moderator' | 'User';

export type UserProps = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};
