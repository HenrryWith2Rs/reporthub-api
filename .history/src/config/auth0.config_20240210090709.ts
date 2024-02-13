export const auth0config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

export const auth0jwtOptions = {
  audience: 'http://localhost:3000/',
  issuerBaseURL: 'https://dev-huvo4a1lbawvcter.us.auth0.com/',
  tokenSigningAlg: 'RS256',
};
