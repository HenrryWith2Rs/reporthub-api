"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = exports.PostService = void 0;
// services/post.serviceImpl.ts
const posts_1 = require("../models/posts");
const post_service_1 = require("./post.service");
class PostService {
    // CREATE //
    // Create a post
    async createPost(data) {
        try {
            const newPost = await (0, post_service_1.createPost)(data);
            return newPost;
        }
        catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
    // READ //
    // Get all posts with optional dynamic query
    async getAllPosts(queryParams) {
        try {
            const posts = await (0, post_service_1.getPosts)(queryParams);
            return posts;
        }
        catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
    // Get a single post by ID
    async getPostById(id) {
        try {
            const post = await (0, post_service_1.getPostById)(id);
            return !post ? 'Post not available' : post;
        }
        catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
    // Get all posts by autocomplete
    async autocompletePosts(query) {
        try {
            const matchingPosts = await posts_1.PostModel.find({
                $or: [
                    { title: { $regex: new RegExp(query, 'i') } },
                    { description: { $regex: new RegExp(query, 'i') } },
                    { author: { $regex: new RegExp(query, 'i') } },
                    { isbn: { $regex: new RegExp(query, 'i') } },
                ],
            }).limit(10);
            return !matchingPosts ? 'No results' : matchingPosts;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // UPDATE //
    // Update a post by ID
    async updatePostById(id, values) {
        try {
            // Update the post
            let post = await (0, post_service_1.updatePostById)(id, values);
            // Fetch the updated post
            post = await (0, post_service_1.getPostById)(id);
            return !post ? 'Post not available' : post;
        }
        catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
    // DELETE //
    // Delete a post by ID
    async deletePostById(id) {
        try {
            const post = await (0, post_service_1.deletePostById)(id);
            return !post ? 'Post not available' : post;
        }
        catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }
}
exports.PostService = PostService;
//export the class
exports.PostServices = new PostService();
//# sourceMappingURL=post.serviceImpl.js.map