// services/user.service.ts
import { UserModel } from '../models/users';
import { postsProps } from '../types/types';

/* Post Actions */

// Create
export const createPost = async (post: postsProps) =>
  await UserModel.create(post);

// Read
export const getPostByISBN = (isbn: string) => UserModel.findOne({ isbn });
// Read
export const getPosts = (queryParams?: Partial<postsProps>) => {
  // Construct the query based on the provided parameters
  const query = queryParams ? { ...queryParams } : {};
  return UserModel.find(query);
};
export const getPostById = (id: string) => UserModel.findById({ _id: id });

// Update
export const updatePostById = (id: string, values: postsProps) =>
  UserModel.findByIdAndUpdate(id, values);

// Delete
export const deletePostById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
