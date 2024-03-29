// router/auth.routes.ts
import express from 'express';
import { register, login, logout } from '../controllers/auth.controller';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.get('/auth/logout', logout);
};
