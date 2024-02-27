"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post('/user/', user_controller_1.userController.addUser);
    router.get('/user/', middlewares_1.isAuthenticated, user_controller_1.userController.getUsers);
    router.get('/user/autocomplete', user_controller_1.userController.autocompleteUsers);
    router.get('/user/:id', user_controller_1.userController.getUser);
    router.put('/user/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.userController.updateUser);
    router.delete('/user/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, user_controller_1.userController.deleteUser);
};
//# sourceMappingURL=user.routes.js.map