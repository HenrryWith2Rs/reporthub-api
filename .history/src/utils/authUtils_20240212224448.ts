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

export const generateAccessToken = (user: UserProps) => {
  const payload = {
    sub: user.email,
    name: user.firstName,
    role: user.role,
  };

  const secret = process.env.SECRET;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (token: string) => {
  const secret = process.env.SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
