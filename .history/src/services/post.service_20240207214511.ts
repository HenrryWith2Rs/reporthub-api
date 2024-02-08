// services/post.service.ts
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';

// Post Actions
export const getPosts = () => PostModel.find();
export const getPostByEmail = (email: string) => PostModel.findOne({ email });
export const getPostById = (id: string) => PostModel.findById(id);
export const createPost = (post: postsProps) =>
  new PostModel(post).save().then((Post) => Post.toObject());
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
