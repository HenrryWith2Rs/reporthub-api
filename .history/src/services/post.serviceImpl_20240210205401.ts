import { IPostService } from './post.service';
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';

export class PostServiceImpl implements IPostService {
  async createPost(data: postsProps) {
    try {
      const newPost = await PostModel.create(data);
      return newPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllPosts(queryParams?: Partial<postsProps>) {
    try {
      const posts = await PostModel.find(queryParams);
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPostById(id: string) {
    try {
      const post = await PostModel.findById(id);
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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

  async updatePostById(id: string, values: postsProps) {
    try {
      const oldPost = await PostModel.findByIdAndUpdate(id, values);
      const updatedPost = await this.getPostById(id);
      return !updatedPost ? 'Post not available' : updatedPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePostById(id: string) {
    try {
      const post = await PostModel.findByIdAndDelete(id);
      return !post ? 'Post not available' : post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
