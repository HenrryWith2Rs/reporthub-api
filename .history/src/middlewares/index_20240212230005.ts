import express from 'express';
import { verifyAccessToken } from '../utils/authUtils';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }

    // Extract the token by removing the "Bearer " prefix
    const token = authHeader.slice(7); // "Bearer ".length === 7

    // Verify the access token
    const result = await verifyAccessToken(token);

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
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
