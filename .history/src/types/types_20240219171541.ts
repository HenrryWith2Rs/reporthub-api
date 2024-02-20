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

export type LoginResponseDTO = {
  sub: string;
  name: string;
  role: string;
};

export type QueryDtldItem = {
  Description: string;
  Cell_Description: string;
  Result: number | string;
  Cell_Result: string;
  Percentage: number | string;
  Cell_Percentage: string;
  Tags: string;
  Order: number;
};

export type QuerySmmrItem = {
  Description: string;
  Result: number | string;
  Cell_Result: string;
  Percentage: number | string;
  Cell_Percentage: string;
  Tags: string;
  Order: number;
};

export type ReportProps = {
  key: string;
  date: string;
  bot: string;
  reportType: string;
  resultSet: any[];
};
