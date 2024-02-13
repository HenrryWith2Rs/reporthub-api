// services/user.service.ts
import { UserModel } from '../models/users';
import { UserProps } from '../types/types';

/* User Actions */

// Create
export const createUser = async (user: UserProps) =>
  await UserModel.create(user);

// Read
export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email }).select(
    '+authentication.salt +authentication.password'
  );

export const getUsers = (queryParams?: Partial<UserProps>) => {
  // Construct the query based on the provided parameters
  const query = queryParams ? { ...queryParams } : {};
  return UserModel.find(query);
};
export const getUserById = (id: string) => UserModel.findById({ _id: id });

// Update
export const updateUserById = (id: string, values: UserProps) =>
  UserModel.findByIdAndUpdate(id, values);

// Delete
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
