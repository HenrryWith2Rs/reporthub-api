// router/report.routes.ts
import express from 'express';
import { reportController } from '../controllers/report.controller';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/report/appt/detailed', reportController.RequestApptDtldReport);
  router.get('/report/appt/summary', reportController.RequestApptSmmrReport);
  //   router.post('/user/', userController.addUser);
  //   router.get('/user/', isAuthenticated, userController.getUsers);
  //   router.get('/user/autocomplete', userController.autocompleteUsers);
  //   router.get('/user/:id', userController.getUser);
  //   router.put('/user/:id', isAuthenticated, isOwner, userController.updateUser);
  //   router.delete(
  //     '/user/:id',
  //     isAuthenticated,
  //     isOwner,
  //     userController.deleteUser
  //   );
};
