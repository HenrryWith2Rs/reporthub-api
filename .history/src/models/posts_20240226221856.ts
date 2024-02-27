// models/posts.ts
import { Schema, model } from 'mongoose';
import { PostProps } from '../types/commonTypes';
import Joi from 'joi';

// validation schema
export const PostschemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  published: Joi.boolean().required(),
  isbn: Joi.string().required(),
});

// Postschema
const PostSchema = new Schema<PostProps>({
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
    type: String,
    required: true,
  },
});

//creating a model
export const PostModel = model<PostProps>('Post', PostSchema);
