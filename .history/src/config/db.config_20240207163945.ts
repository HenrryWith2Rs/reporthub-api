//importing modules
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//details from the env
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = 'Post';
