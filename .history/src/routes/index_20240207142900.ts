// router/index.ts
import express from 'express';
import testRoutes from './testRoutes';
const router = express.Router();

export default (): express.Router => {
  testRoutes(router);

  return router;
};
