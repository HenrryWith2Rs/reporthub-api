"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.getPostByISBN = exports.createPost = void 0;
// services/post.service.ts
const posts_1 = require("../models/posts");
/* Post Actions */
// Create
const createPost = async (post) => await posts_1.PostModel.create(post);
exports.createPost = createPost;
// Read
const getPostByISBN = (isbn) => posts_1.PostModel.findOne({ isbn });
exports.getPostByISBN = getPostByISBN;
const getPosts = (queryParams) => {
    // Construct the query based on the provided parameters
    const query = queryParams ? { ...queryParams } : {};
    return posts_1.PostModel.find(query);
};
exports.getPosts = getPosts;
const getPostById = (id) => posts_1.PostModel.findById({ _id: id });
exports.getPostById = getPostById;
// Update
const updatePostById = (id, values) => posts_1.PostModel.findByIdAndUpdate(id, values);
exports.updatePostById = updatePostById;
// Delete
const deletePostById = (id) => posts_1.PostModel.findOneAndDelete({ _id: id });
exports.deletePostById = deletePostById;
//# sourceMappingURL=post.service.js.map