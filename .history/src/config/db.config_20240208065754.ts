// config/db.config.ts
//importing modules
import mongoose from 'mongoose';

//details from the env
const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const dbName = 'ReportHub';

//connection string to mongo atlas
const connectionString = `mongodb+srv://${username}:${password}@clusterr0.xuxqyuv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const connectToDB = async () => {
  try {
    const res = await mongoose.connect(connectionString, options);
    if (res) {
      console.log(`Database connection successful... dbName ->  ${dbName}`);
    }
  } catch (err) {
    console.error(err);
  }
};
