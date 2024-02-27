// services/post.serviceImpl.ts
import { PostModel } from '../models/posts';
import { PostProps } from '../types/commonTypes';
import {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
} from './post.service';

export class PostService {
  // CREATE //
  // Create a post
  async createPost(data: PostProps) {
    try {
      const newPost = await createPost(data);
      return newPost;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  // READ //
  // Get all posts with optional dynamic query
  async getAllPosts(queryParams?: Partial<PostProps>) {
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

  // Get all posts by autocomplete
  async autocompletePosts(query: string) {
    try {
      const matchingPosts = await PostModel.find({
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { author: { $regex: new RegExp(query, 'i') } },
          { isbn: { $regex: new RegExp(query, 'i') } },
        ],
      }).limit(10);
      return !matchingPosts ? 'No results' : matchingPosts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // UPDATE //
  // Update a post by ID
  async updatePostById(id: string, values: PostProps) {
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

  // DELETE //
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
export const PostServices = new PostService();
