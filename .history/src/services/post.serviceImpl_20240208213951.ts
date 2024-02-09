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
  // Create a post
  async createPost(data: postsProps) {
    try {
      const newPost = await createPost(data);
      return newPost;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
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

  // Get a single post by ID
  async getPostById(id: string) {
    try {
      const post = await getPostById(id);
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  // Update a post by ID
  async updatePostById(id: string, values: postsProps) {
    try {
      // Update the post
      let post = await updatePostById(id, values);
      // Fetch the updated post
      post = await getPostById(id);
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  // Delete a post by ID
  async deletePostById(id: string) {
    try {
      const post = await deletePostById(id);
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }
}

//export the class
export const postServices = new postService();
