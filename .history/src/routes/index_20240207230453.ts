// router/index.ts
import express from 'express';
import testRoutes from './testRoutes';
import postRoutes from './post.routes';
const router = express.Router();

export default (): express.Router => {
  testRoutes(router);
  postRoutes(router);

  return router;
};
