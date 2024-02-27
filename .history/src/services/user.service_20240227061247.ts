// services/user.serviceImpl.ts

import { UserModel } from '../models/users';
import { UserProps } from '../types/commonTypes';
import { random, passwordSalter } from 'utils/authUtils';

class UserService {
  // CREATE //
  // Create a User
  async createUser(data: UserProps) {
    try {
      const newUser = await UserModel.create(data);
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
      const query = queryParams ? { ...queryParams } : {};
      const users = UserModel.find(query);
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single User by ID
  async fetchUserById(userId: string) {
    try {
      const user = await UserModel.findOne({ userId });
      return !user ? 'User not found' : user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get a single User by Email
  async fetchUserByEmail(email: string) {
    try {
      const response = await UserModel.findOne({ email });
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
  async updateUserById(userId: string, values: UserProps) {
    try {
      if (values.password) {
        // Generate a new salt for the user
        const newSalt = random();
        // Hash the new password using the new salt
        values.password = passwordSalter(newSalt, values.password);
        // Update the salt field in the values object
        values.salt = newSalt;
      }
      let user = await UserModel.findOneAndUpdate({ userId }, values);

      // Fetch the updated User
      user = await UserModel.findOne({ userId });
      return !user ? 'User not available' : user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // DELETE //
  // Delete a User by ID
  async deleteUserById(userId: string) {
    try {
      const user = await UserModel.findOneAndDelete({ userId });
      return !user ? 'User not available' : user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//export the class
export const UserServices = new UserService();
