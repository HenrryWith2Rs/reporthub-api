"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = exports.postService = void 0;
//import module
const posts_1 = require("../models/posts");
const post_service_1 = require("./post.service");
class postService {
    //create a post
    async createPost(data) {
        try {
            const newPost = await (0, post_service_1.createPost)(data);
            return newPost;
        }
        catch (error) {
            console.log(error);
        }
    }
    //get all posts
    async getPosts() {
        try {
            const posts = await posts_1.PostModel.find({});
            return posts;
        }
        catch (error) {
            console.log(error);
        }
    }
    //get a single post
    async getPost(id) {
        try {
            const post = await posts_1.PostModel.findById({ _id: id });
            if (!post) {
                return 'post not available';
            }
            return post;
        }
        catch (error) {
            console.log(error);
        }
    }
    //update a post
    async updatePost(id, data) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const postz = await posts_1.PostModel.findByIdAndUpdate({ _id: id }, data, {
                new: true,
            });
            if (!postz) {
                return 'post not available';
            }
            return postz;
        }
        catch (error) {
            console.log(error);
        }
    }
    //delete a post by using the find by id and delete
    async deletePost(id) {
        try {
            const post = await posts_1.PostModel.findByIdAndDelete(id);
            if (!post) {
                return 'post not available';
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.postService = postService;
//export the class
exports.postServices = new postService();
//# sourceMappingURL=post.serviceImpl.js.map