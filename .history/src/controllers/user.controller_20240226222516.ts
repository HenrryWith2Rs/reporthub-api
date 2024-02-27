// controllers/user.controller.ts
import { UserServices } from '../services/user.service';
import { Request, Response } from 'express';
import { UserSchemaValidate } from '../models/users';

class UserController {
  // Add User controller
  async addUser(req: Request, res: Response) {
    try {
      // get values
      const { firstName, lastName, username, email, password } = req.body;

      // check if a value is missing
      if (!firstName || !lastName || !username || !email || !password)
        return res.status(400).json({ error: 'missing a required field' });

      // Check if a User with the provided Email already exists
      const existingUser = await UserServices.fetchUserByEmail(email);
      if (!existingUser) {
        return res
          .status(400)
          .json({ error: 'A User with this Email already exists' });
      }

      // create data obj
      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      };

      //validate the request
      const { error, value } = UserSchemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error: `error validata data: ${error}` });
      } else {
        //call the create User function in the service and pass the data from the request
        const user = await UserServices.createUser(value);
        return res.status(201).json(user);
      }
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all Users with optional dynamic query
  async getUsers(req: Request, res: Response) {
    try {
      const queryParams = req.query; // Get query parameters from request
      const users = await UserServices.fetchUsers(queryParams);
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get a single User
  async getUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await UserServices.fetchUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get Users with autocomplete
  async autocompleteUsers(req: Request, res: Response) {
    try {
      const query: string = req.query.q as string;

      if (!query) {
        return res
          .status(400)
          .json({ error: 'Query parameter "q" is required' });
      }

      const matchingUsers = await UserServices.autocompleteForUsers(query);

      return res.status(200).json(matchingUsers);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update User
  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await UserServices.updateUserById(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete a User
  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await UserServices.deleteUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const userController = new UserController();
