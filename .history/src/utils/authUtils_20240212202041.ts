import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserProps } from 'types/types';

const SECRET = process.env.SECRET;

export const passwordSalter = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');

function generateAccessToken(user: UserProps) {
  const payload = {
    sub: user.username,
    name: user.firstName,
    role: user.role,
  };

  const secret = 'your-secret-key';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}
