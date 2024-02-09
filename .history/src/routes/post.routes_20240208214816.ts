// router/post.routes.ts
import express from 'express';
import { PostController } from '../controllers/post.controller';

export default (router: express.Router) => {
  router.post('/post/', PostController.addPost);
  router.get('/post/', PostController.getPosts);
  router.get('/post/:id', PostController.getPost);
  router.put('/post/:id', PostController.updatePost);
  router.delete('/post/:id', PostController.deletePost);
};
