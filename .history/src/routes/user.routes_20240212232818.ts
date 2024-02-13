// router/user.routes.ts
import express from 'express';
import { userController } from '../controllers/user.controller';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.post('/user/', userController.addUser);
  router.get('/user/', isAuthenticated, userController.getUsers);
  router.get('/user/autocomplete', userController.autocompleteUsers);
  router.get('/user/:id', userController.getUser);
  router.put('/user/:id', userController.updateUser);
  router.delete('/user/:id', userController.deleteUser);
};
