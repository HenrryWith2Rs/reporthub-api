"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
//import modules
const post_service_1 = require("../services/post.service");
const post_serviceImpl_1 = require("../services/post.serviceImpl");
const posts_1 = require("../models/posts");
class postController {
    //add post controller
    addpost = async (req, res) => {
        //data to be saved in database
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
                const post = await post_serviceImpl_1.postServices.createPost(value);
                return res.status(201).json(post);
            }
        }
        catch (error) {
            console.error('error -> ', error);
        }
    };
    //get all posts
    getPosts = async (req, res) => {
        const posts = await post_serviceImpl_1.postServices.getPosts();
        res.send(posts);
    };
    //get a single post
    getAPost = async (req, res) => {
        //get id from the parameter
        const id = req.params.id;
        const post = await post_serviceImpl_1.postServices.getPost(id);
        res.send(post);
    };
    //update post
    updatePost = async (req, res) => {
        const id = req.params.id;
        const post = await post_serviceImpl_1.postServices.updatePost(id, req.body);
        res.send(post);
    };
    //delete a post
    deletePost = async (req, res) => {
        const id = req.params.id;
        await post_serviceImpl_1.postServices.deletePost(id);
        res.send('post deleted');
    };
}
//export class
exports.PostController = new postController();
//# sourceMappingURL=post.controller.js.map