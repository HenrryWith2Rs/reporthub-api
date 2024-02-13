// index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// import { auth } from 'express-openid-connect';
import { auth } from 'express-oauth2-jwt-bearer';
import { auth0config, auth0jwtOptions } from './config/auth0.config';
import { connectToDB } from './config/db.config';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
const origin = process.env.ORIGIN || 'http://localhost:5173'; // Default to localhost if ORIGIN is not set

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: origin }));
// app.use(auth(auth0config));
const jwtCheck = auth({
  audience: 'http://localhost:3000/',
  issuerBaseURL: 'https://dev-huvo4a1lbawvcter.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});
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
