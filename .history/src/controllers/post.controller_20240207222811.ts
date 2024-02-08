//import modules
import { postServices } from '../services/post.serviceImpl';
import { Request, Response } from 'express';
import { PostschemaValidate } from '../models/posts';

class postController {
  //add post controller
  addpost = async (req: Request, res: Response) => {
    //data to be saved in database
    try {
      // get values
      const { title, author, description, published } = req.body;

      // check if a value is missing
      if (!title || !author || !description || !published)
        return res.status(400).json({ error: 'missing a required field' });

      // create data obj
      const data = {
        title: title,
        author: author,
        description: description,
        published: published,
      };
      //validating the request
      const { error, value } = PostschemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        //call the create post function in the service and pass the data from the request
        const post = await postServices.createPost(value);
        res.status(201).send(post);
      }
    } catch (error) {}
  };

  //get all posts
  getPosts = async (req: Request, res: Response) => {
    const posts = await postServices.getPosts();
    res.send(posts);
  };

  //get a single post
  getAPost = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id;
    const post = await postServices.getPost(id);
    res.send(post);
  };

  //update post
  updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await postServices.updatePost(id, req.body);
    res.send(post);
  };

  //delete a post
  deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    await postServices.deletePost(id);
    res.send('post deleted');
  };
}

//export class
export const PostController = new postController();
