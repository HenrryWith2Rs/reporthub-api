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
  email: string;
  username: string;
  password: string;
  role: UserRole;
};
