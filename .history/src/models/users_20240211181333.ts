// models/posts.ts
import { Schema, model } from 'mongoose';
import { UserProps } from '../types/types';
import Joi from 'joi';

// validation schema
export const userSchemaValidate = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// User Config
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
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

//creating a model
export const UserModel = model<UserProps>('Post', UserSchema);
