// index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import router from './router';

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
const origin = process.env.ORIGIN || 'http://localhost:5173'; // Default to localhost if ORIGIN is not set

// middleware
app.use(express.json());
app.use(cors({ origin: origin }));
app.use('/api', router());

async function initializeApp() {
  // Start express app
  try {
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
