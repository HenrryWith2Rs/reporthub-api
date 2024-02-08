// models/posts.ts
import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { postsProps } from '../types/types';

// validation schema
export const PostschemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  published: Joi.boolean().required(),
  isbn: Joi.number().required(),
});

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
  isbn: {
    type: Number,
    required: true,
  },
});

//creating a model
export const PostModel = model<postsProps>('Post', postSchema);
