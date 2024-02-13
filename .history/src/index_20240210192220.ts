import express from 'express';
const app = express();
import { auth } from 'express-oauth2-jwt-bearer';

const port = process.env.PORT || 3000;

const jwtCheck = auth({
  audience: 'http://localhost:3000/',
  issuerBaseURL: 'https://dev-huvo4a1lbawvcter.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);
