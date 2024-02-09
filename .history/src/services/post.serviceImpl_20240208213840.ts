// services/post.serviceImpl.ts
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';
import {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
} from './post.service';

export class postService {
  //create a post
  async createPost(data: postsProps) {
    try {
      const newPost = await createPost(data);
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  // Get all posts with optional dynamic query
  async getAllPosts(queryParams?: Partial<postsProps>) {
    try {
      const posts = await getPosts(queryParams);
      return posts;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  //update a post
  async updatePost(id: string, values: postsProps) {
    try {
      // mongoose function returns previous data
      let post = await updatePostById(id, values);

      // Fetch a new copy to verify changes
      post = await getPostById(id);

      // If there is no post, say so, otherwise...
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
    }
  }

  //delete a post by using the find by id and delete
  async deletePost(id: string) {
    try {
      const post = await deletePostById(id);
      // If there is no post, say so, otherwise...
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
    }
  }
}

//export the class
export const postServices = new postService();
