// controllers/auth.controller.ts
import express from 'express';
import {
  passwordSalter,
  random,
  generateAccessToken,
} from '../utils/authUtils';
import { UserServices } from '../services/user.serviceImpl';
import { UserProps } from 'types/types';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.sendStatus(400);
    }

    // Check if user already exists
    const existingUser = await UserServices.getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const newUser: UserProps | null = await UserServices.createUser({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passwordSalter(salt, password),
      role: 'User',
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.sendStatus(400);
//     }

//     const user = await UserServices.getUserByEmail(email);

//     if (!user) {
//       return res.sendStatus(400);
//     }

//     const expectedHash = authentication(user.authentication.salt, password);

//     if (user.authentication.password != expectedHash) {
//       return res.sendStatus(403);
//     }

//     const salt = random();
//     user.authentication.sessionToken = authentication(
//       salt,
//       user._id.toString()
//     );

//     await user.save();

//     res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, {
//       domain: 'localhost',
//       path: '/',
//     });

//     return res.status(200).json(user).end();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };
