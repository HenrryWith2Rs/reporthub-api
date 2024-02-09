//import modules
import { getPostByISBN } from '../services/post.service';
import { postServices } from '../services/post.serviceImpl';
import { Request, Response } from 'express';
import { PostschemaValidate } from '../models/posts';

class postController {
  //add post controller
  addpost = async (req: Request, res: Response) => {
    //data to be saved in database
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
        return res
          .status(400)
          .json({ error: `error validating data: ${error}` });
      } else {
        //call the create post function in the service and pass the data from the request
        const post = await postServices.createPost(value);
        return res.status(201).json(post);
      }
    } catch (error) {
      console.error('error -> ', error);
    }
  };

  //get all posts
  getPosts = async (req: Request, res: Response) => {
    try {
      const posts = await postServices.getPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('error -> ', error);
    }
  };

  //get a single post
  getAPost = async (req: Request, res: Response) => {
    try {
      //get id from the parameter
      const id = req.params.id;
      const post = await postServices.getPost(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('error -> ', error);
    }
  };

  //update post
  updatePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await postServices.updatePost(id, req.body);
      return res.status(200).json(post);
    } catch (error) {
      console.error('error -> ', error);
    }
  };

  //delete a post
  deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await postServices.deletePost(id);
      return res.status(200).json(post);
    } catch (error) {
      console.error('error -> ', error);
    }
  };
}

//export class
export const PostController = new postController();
