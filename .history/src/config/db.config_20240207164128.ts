//importing modules
import mongoose from 'mongoose';

//details from the env
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = 'Posts';

//connection string to mongo atlas
const connectionString = `mongodb+srv://${username}:${password}@clusterr0.xuxqyuv.mongodb.net//${dbName}?retryWrites=true&w=majority`;
