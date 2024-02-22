// router/report.routes.ts
import express from 'express';
import { reportController } from '../controllers/report.controller';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  // router.get('/report/appt/detailed', reportController.requestApptDtldReport);
  // router.get('/report/appt/summary', reportController.requestApptSmmrReport);
  router.get(
    '/report/appt/request',
    isAuthenticated,
    reportController.requestReportsByQuery
  );
  // router.get('/report/appt/query', reportController.requestReportsByQuery);
  router.put('/report/appt/:id', reportController.updateReport);
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
