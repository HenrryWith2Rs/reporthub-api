// index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { connectToDB } from './config/db.config';
import router from './routes';

const app = express();
const port = process.env.PORT; // Default to port 3000 if PORT is not set
const origin = process.env.ORIGIN; // Default to localhost if ORIGIN is not set

// CORS options
const corsOptions: cors.CorsOptions = {
  origin: origin,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/api', router());

async function initializeApp() {
  // Start express app
  try {
    // initialize db
    await connectToDB();

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
