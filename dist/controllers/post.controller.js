"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
// controllers/post.controller.ts
const post_service_1 = require("../services/post.service");
const post_serviceImpl_1 = require("../services/post.serviceImpl");
const posts_1 = require("../models/posts");
class postController {
    // Add post controller
    async addPost(req, res) {
        try {
            // get values
            const { title, author, description, published, isbn } = req.body;
            // check if a value is missing
            if (!title || !author || !description || !isbn)
                return res.status(400).json({ error: 'missing a required field' });
            // Check if a post with the provided ISBN already exists
            const existingPost = await (0, post_service_1.getPostByISBN)(isbn);
            if (existingPost) {
                return res
                    .status(400)
                    .json({ error: 'A post with this ISBN already exists' });
            }
            // create data obj
            const data = {
                title: title,
                author: author,
                description: description,
                published: published,
                isbn: isbn,
            };
            //validate the request
            const { error, value } = posts_1.PostschemaValidate.validate(data);
            if (error) {
                return res.status(400).json({ error: `error validata data: ${error}` });
            }
            else {
                //call the create post function in the service and pass the data from the request
                const post = await post_serviceImpl_1.PostServices.createPost(value);
                return res.status(201).json(post);
            }
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get all posts with optional dynamic query
    async getPosts(req, res) {
        try {
            const queryParams = req.query; // Get query parameters from request
            const posts = await post_serviceImpl_1.PostServices.getAllPosts(queryParams);
            return res.status(200).json(posts);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get a single post
    async getPost(req, res) {
        try {
            const id = req.params.id;
            const post = await post_serviceImpl_1.PostServices.getPostById(id);
            return res.status(200).json(post);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get posts with autocomplete
    async autocompletePosts(req, res) {
        try {
            const query = req.query.q;
            if (!query) {
                return res
                    .status(400)
                    .json({ error: 'Query parameter "q" is required' });
            }
            const matchingPosts = await post_serviceImpl_1.PostServices.autocompletePosts(query);
            return res.status(200).json(matchingPosts);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Update post
    async updatePost(req, res) {
        try {
            const id = req.params.id;
            const post = await post_serviceImpl_1.PostServices.updatePostById(id, req.body);
            return res.status(200).json(post);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Delete a post
    async deletePost(req, res) {
        try {
            const id = req.params.id;
            const post = await post_serviceImpl_1.PostServices.deletePostById(id);
            return res.status(200).json(post);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
//export class
exports.PostController = new postController();
//# sourceMappingURL=post.controller.js.map