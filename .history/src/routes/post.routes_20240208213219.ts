// router/testRouter.ts
import express from 'express';
import { PostController } from '../controllers/post.controller';

export default (router: express.Router) => {
  router.post('/post/', PostController.addpost);
  router.get('/post/', PostController.getPosts);
  router.get('/post/:id', PostController.getAPost);
  router.put('/post/:id', PostController.updatePost);
  router.delete('/post/:id', PostController.deletePost);
};
