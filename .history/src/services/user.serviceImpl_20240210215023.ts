// services/User.serviceImpl.ts
import { UserModel } from '../models/users';
import { UserProps } from '../types/types';
import {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from './user.service';

export class UserService {
  // CREATE //
  // Create a User
  async createUser(data: UserProps) {
    try {
      const newUser = await createUser(data);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // READ //
  // Get all Users with optional dynamic query
  async getAllUsers(queryParams?: Partial<UserProps>) {
    try {
      const Users = await getUsers(queryParams);
      return Users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single User by ID
  async getUserById(id: string) {
    try {
      const User = await getUserById(id);
      return !User ? 'User not found' : User;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get all Users by autocomplete
  async autocompleteUsers(query: string) {
    try {
      const matchingUsers = await UserModel.find({
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { author: { $regex: new RegExp(query, 'i') } },
          { isbn: { $regex: new RegExp(query, 'i') } },
        ],
      }).limit(10);
      return !matchingUsers ? 'No results' : matchingUsers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // UPDATE //
  // Update a User by ID
  async updateUserById(id: string, values: UserProps) {
    try {
      // Update the User
      let User = await updateUserById(id, values);
      // Fetch the updated User
      User = await getUserById(id);
      return !User ? 'User not available' : User;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // DELETE //
  // Delete a User by ID
  async deleteUserById(id: string) {
    try {
      const User = await deleteUserById(id);
      return !User ? 'User not available' : User;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//export the class
export const UserServices = new UserService();
