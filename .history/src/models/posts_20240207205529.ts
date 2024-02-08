//importing modules
import { Schema, model } from 'mongoose';
import Joi from 'joi';

//validation schema
export const PostschemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  published: Joi.boolean().required(),
});

//creating an interface
type postsType = {
  title: string;
  description: string;
  author: string;
  published: boolean;
};
