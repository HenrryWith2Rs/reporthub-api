// controllers/user.controller.ts
import { UserServices } from '../services/user.serviceImpl';
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

      // Check if a User with the provided ISBN already exists
      const existingUser = await UserServices.getUserByEmail(email);
      if (existingUser) {
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
      const { error, value } = PostschemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error: `error validata data: ${error}` });
      } else {
        //call the create post function in the service and pass the data from the request
        const post = await PostServices.createPost(value);
        return res.status(201).json(post);
      }
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all posts with optional dynamic query
  async getPosts(req: Request, res: Response) {
    try {
      const queryParams = req.query; // Get query parameters from request
      const posts = await PostServices.getAllPosts(queryParams);
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get a single post
  async getPost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await PostServices.getPostById(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get posts with autocomplete
  async autocompletePosts(req: Request, res: Response) {
    try {
      const query: string = req.query.q as string;

      if (!query) {
        return res
          .status(400)
          .json({ error: 'Query parameter "q" is required' });
      }

      const matchingPosts = await PostServices.autocompletePosts(query);

      return res.status(200).json(matchingPosts);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update post
  async updatePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await PostServices.updatePostById(id, req.body);
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete a post
  async deletePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await PostServices.deletePostById(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const PostController = new postController();
