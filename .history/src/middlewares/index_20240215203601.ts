import express from 'express';
import { verifyAccessToken } from '../utils/authUtils';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = extractToken(req);

    // Verify the access token
    const result = verifyAccessToken(token);

    // If verification fails, return 403 Forbidden
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }

    // If verification succeeds, call the next middleware or route handler
    return next();
  } catch (error) {
    console.error('Error in isAuthenticated middleware:', error);
    return res.sendStatus(500);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params; // Assuming the user ID is passed in the request parameters
    const token = extractToken(req);

    // Verify the access token
    const result = verifyAccessToken(token);

    // pull id from token
    const currentUserId = result?.data?.sub;

    // Check if the user ID from the token matches the ID from the request parameters
    if (currentUserId === id) {
      // If the IDs match, the user is authorized to perform the action
      return next();
    } else {
      // If the IDs don't match, the user is not authorized to perform the action
      return res
        .status(403)
        .json({ error: 'You are not authorized to perform this action' });
    }
  } catch (error) {
    console.error('Error in isOwner middleware:', error);
    return res.sendStatus(500);
  }
};

const extractToken = (req: express.Request): string | null => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7); // "Bearer ".length === 7
};
