// router/testRouter.ts
import express from 'express';
import { testGet, testPost } from '../controllers/testController';

export default (router: express.Router) => {
  router.get('/testGet', testGet);
  router.post('/testPost', testPost);
};
