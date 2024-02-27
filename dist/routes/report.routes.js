"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_controller_1 = require("../controllers/report.controller");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    // router.get('/report/appt/detailed', reportController.requestApptDtldReport);
    // router.get('/report/appt/summary', reportController.requestApptSmmrReport);
    router.get('/report/appt/request', middlewares_1.isAuthenticated, report_controller_1.reportController.requestReportsByQuery);
    // router.get('/report/appt/query', reportController.requestReportsByQuery);
    router.put('/report/appt/:id', report_controller_1.reportController.updateReport);
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
//# sourceMappingURL=report.routes.js.map