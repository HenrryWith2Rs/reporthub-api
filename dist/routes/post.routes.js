"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("../controllers/post.controller");
exports.default = (router) => {
    router.post('/post/', post_controller_1.PostController.addpost);
};
//# sourceMappingURL=post.routes.js.map