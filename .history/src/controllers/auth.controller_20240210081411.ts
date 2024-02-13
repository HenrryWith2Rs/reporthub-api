// controllers/post.controller.ts
import { Request, Response } from 'express';

class postController {
  // Add post controller
  async login(req: Request, res: Response) {
    try {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const PostController = new postController();
