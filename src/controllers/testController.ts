// controllers/testController.ts
import express, { Request, Response } from 'express';

export const testGet = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.query;
    console.log('email', email);
    console.log('password', password);

    const user = {
      email: email,
      password: password,
    };

    return res.status(200).json(user).end();
  } catch (error) {
    console.log('Error on testGet -> ', error);
    return res.status(400).json(error);
  }
};

export const testPost = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('email', email);
    console.log('password', password);

    const user = {
      email: email,
      password: password,
    };

    return res.status(200).json(user).end();
  } catch (error) {
    console.log('Error on testPost -> ', error);
    return res.status(400).json(error);
  }
};
