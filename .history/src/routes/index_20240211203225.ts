// router/index.ts
import express from 'express';
import testRoutes from './testRoutes';
import postRoutes from './post.routes';
import userRoutes from './user.routes';
// import authRoutes from './auth.routes';
const router = express.Router();

export default (): express.Router => {
  testRoutes(router);
  postRoutes(router);
  userRoutes(router);
  // authRoutes(router);

  return router;
};
