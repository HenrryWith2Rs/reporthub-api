// services/post.service.ts
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';

/* Post Actions */

// Create
export const createPost = async (post: postsProps) =>
  await PostModel.create(post);

// Read
export const getPostByISBN = (isbn: string) => PostModel.findOne({ isbn });
// Read
export const getPosts = (queryParams?: Partial<postsProps>) => {
  // Construct the query based on the provided parameters
  const query = queryParams ? { ...queryParams } : {};
  return PostModel.find(query);
};
export const getPostById = (id: string) => PostModel.findById({ _id: id });

// Update
export const updatePostById = (id: string, values: postsProps) =>
  PostModel.findByIdAndUpdate(id, values);

// Delete
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
