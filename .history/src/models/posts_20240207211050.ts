// models/posts.ts
import { Schema, model } from 'mongoose';
import Joi from 'joi';

// validation schema
export const PostschemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  published: Joi.boolean().required(),
});

// creating an interface
type postsProps = {
  title: string;
  description: string;
  author: string;
  published: boolean;
};

// Postschema
const postSchema = new Schema<postsProps>({
  title: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
});

//creating a model
export const PostModel = model<postsProps>('Post', postSchema);

// Post Actions
export const getPosts = () => PostModel.find();
export const getPostByEmail = (email: string) => PostModel.findOne({ email });
export const getPostById = (id: string) => PostModel.findById(id);
export const createPost = (values: Record<string, any>) =>
  new PostModel(values).save().then((Post) => Post.toObject());
export const deletePostById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
