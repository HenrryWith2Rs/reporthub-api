// services/post.service.ts
import { postsProps } from '../types/types';

/* Post Actions */

export interface IPostService {
  createPost(data: postsProps): Promise<any>;
  getAllPosts(queryParams?: Partial<postsProps>): Promise<any>;
  getPostById(id: string): Promise<any>;
  getPostByISBN(id: string): Promise<any>;
  autocompletePosts(query: string): Promise<any>;
  updatePostById(id: string, values: postsProps): Promise<any>;
  deletePostById(id: string): Promise<any>;
}
