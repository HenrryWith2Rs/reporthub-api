// models/posts.ts
import { Schema, model } from 'mongoose';
import { UserProps } from '../types/types';
import Joi from 'joi';

// validation schema
export const PostschemaValidate = Joi.object({
  email: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  published: Joi.boolean().required(),
  isbn: Joi.string().required(),
});

// User Config
const UserSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Administrator', 'Moderator', 'User'],
    default: 'User',
  },
});

// Postschema
const PostSchema = new Schema<postsProps>({
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
export const PostModel = model<postsProps>('Post', PostSchema);
