"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("../controllers/post.controller");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post('/post/', post_controller_1.PostController.addPost);
    router.get('/post/', middlewares_1.isAuthenticated, post_controller_1.PostController.getPosts);
    router.get('/post/autocomplete', post_controller_1.PostController.autocompletePosts);
    router.get('/post/:id', post_controller_1.PostController.getPost);
    router.put('/post/:id', post_controller_1.PostController.updatePost);
    router.delete('/post/:id', post_controller_1.PostController.deletePost);
};
//# sourceMappingURL=post.routes.js.map