import { Schema, model } from 'mongoose';
import { UserProps } from '../types/commonTypes';
import Joi from 'joi';

// Validation schema
export const UserSchemaValidate = Joi.object({
  userId: Joi.string().required(),
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// User Config
const UserSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String },
  role: {
    type: String,
    enum: ['Administrator', 'Moderator', 'User'],
    default: 'User',
  },
});

// Create model
export const UserModel = model<UserProps>('User', UserSchema);
