// services/post.service.ts
import { PostModel } from '../models/posts';
import { PostProps } from '../types/types';

/* Post Actions */

// Create
export const createPost = async (post: PostProps) =>
  await PostModel.create(post);

// Read
export const getPostByISBN = (isbn: string) => PostModel.findOne({ isbn });
// Read
export const getPosts = (queryParams?: Partial<PostProps>) => {
  // Construct the query based on the provided parameters
  const query = queryParams ? { ...queryParams } : {};
  return PostModel.find(query);
};
export const getPostById = (id: string) => PostModel.findById({ _id: id });

// Update
export const updatePostById = (id: string, values: PostProps) =>
  PostModel.findByIdAndUpdate(id, values);

// Delete
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
