// index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
dotenv.config();
import { connectToDB } from './db/db.config';
import router from './routes';

const app = express();
const port = process.env.PORT; // Default to port 3000 if PORT is not set
const originDev = process.env.ORIGIN_DEV;
const originProd = process.env.ORIGIN_PROD;

// CORS options
const allowedOrigins = [originDev, originProd];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// middleware
app.use(cors(corsOptions)); // Enable CORS before other middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(cookieParser()); // Parse cookies
app.use('/api', router()); // Route handling

async function initializeApp() {
  // Start express app
  try {
    // initialize db
    await connectToDB();

    console.log(corsOptions);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize App -> ', error);
    process.exit(1);
  }
}

// initialize app
initializeApp();

// Handle shutdown or cleanup
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing App and exiting');
  process.exit();
});
