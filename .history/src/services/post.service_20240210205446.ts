// services/post.service.ts
import { PostModel } from '../models/posts';
import { postsProps } from '../types/types';

/* Post Actions */

export interface IPostService {
  createPost(data: postsProps): Promise<any>;
  getAllPosts(queryParams?: Partial<postsProps>): Promise<any>;
  getPostById(id: string): Promise<any>;
  getPostByIsbn(id: string): Promise<any>;
  autocompletePosts(query: string): Promise<any>;
  updatePostById(id: string, values: postsProps): Promise<any>;
  deletePostById(id: string): Promise<any>;
}
