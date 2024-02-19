// services/user.serviceImpl.ts
import { UserModel } from '../models/users';
import { UserProps } from '../types/types';
import {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
} from './user.service';

class UserService {
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
  // Get Users with optional dynamic query
  async fetchUsers(queryParams?: Partial<UserProps>) {
    try {
      const Users = await getUsers(queryParams);
      return Users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single User by ID
  async fetchUserById(id: string) {
    try {
      const User = await getUserById(id);
      return !User ? 'User not found' : User;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single User by Email
  async fetchUserByEmail(email: string) {
    try {
      const response = await getUserByEmail(email);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get all Users by autocomplete
  async autocompleteForUsers(query: string) {
    try {
      const matchingUsers = await UserModel.find({
        $or: [
          { firstName: { $regex: new RegExp(query, 'i') } },
          { lastName: { $regex: new RegExp(query, 'i') } },
          { username: { $regex: new RegExp(query, 'i') } },
          { email: { $regex: new RegExp(query, 'i') } },
          { password: { $regex: new RegExp(query, 'i') } },
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
