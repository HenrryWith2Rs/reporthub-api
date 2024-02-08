// router/testRouter.ts
import express from 'express';
import { PostController } from '../controllers/post.controller';

export default (router: express.Router) => {
  router.post('/post/', PostController.addpost);
};
