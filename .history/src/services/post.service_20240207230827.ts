// services/post.service.ts
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';

/* Post Actions */

// Create
export const createPost = async (post: postsProps) =>
  await PostModel.create(post);

// Read
export const getPosts = () => PostModel.find();
export const getPostByISBN = (isbn: string) => PostModel.findOne({ isbn });
export const getPostById = (id: string) => PostModel.findById(id);
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
