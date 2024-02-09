"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostById = exports.deletePostById = exports.getPostById = exports.getPostByISBN = exports.getPosts = exports.createPost = void 0;
// services/post.service.ts
const posts_1 = require("../models/posts");
/* Post Actions */
// Create
const createPost = async (post) => await posts_1.PostModel.create(post);
exports.createPost = createPost;
// Read
const getPosts = () => posts_1.PostModel.find();
exports.getPosts = getPosts;
const getPostByISBN = (isbn) => posts_1.PostModel.findOne({ isbn });
exports.getPostByISBN = getPostByISBN;
const getPostById = (id) => posts_1.PostModel.findById(id);
exports.getPostById = getPostById;
const deletePostById = (id) => posts_1.PostModel.findOneAndDelete({ _id: id });
exports.deletePostById = deletePostById;
const updatePostById = (id, values) => posts_1.PostModel.findByIdAndUpdate(id, values);
exports.updatePostById = updatePostById;
//# sourceMappingURL=post.service.js.map