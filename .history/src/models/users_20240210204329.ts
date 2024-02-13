// models/posts.ts
import { Schema, model } from 'mongoose';
import { UserProps } from '../types/types';
import Joi from 'joi';

// validation schema
export const PostschemaValidate = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
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
const PostSchema = new Schema<UserProps>({
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
