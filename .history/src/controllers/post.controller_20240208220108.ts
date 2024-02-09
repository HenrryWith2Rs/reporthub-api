// controllers/post.controller.ts
import { getPostByISBN } from '../services/post.service';
import { postServices } from '../services/post.serviceImpl';
import { Request, Response } from 'express';
import { PostschemaValidate } from '../models/posts';

class postController {
  // Add post controller
  async addPost(req: Request, res: Response) {
    try {
      // get values
      const { title, author, description, published, isbn } = req.body;

      // check if a value is missing
      if (!title || !author || !description || !isbn)
        return res.status(400).json({ error: 'missing a required field' });

      // Check if a post with the provided ISBN already exists
      const existingPost = await getPostByISBN(isbn);
      if (existingPost) {
        return res
          .status(400)
          .json({ error: 'A post with this ISBN already exists' });
      }
      // create data obj
      const data = {
        title: title,
        author: author,
        description: description,
        published: published,
        isbn: isbn,
      };

      //validate the request
      const { error, value } = PostschemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error: `error validata data: ${error}` });
      } else {
        //call the create post function in the service and pass the data from the request
        const post = await postServices.createPost(value);
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
      const posts = await postServices.getAllPosts(queryParams);
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
      const post = await postServices.getPostById(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update post
  async updatePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await postServices.updatePostById(id, req.body);
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
      const post = await postServices.deletePostById(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const PostController = new postController();
