// controllers/auth.controller.ts
import express from 'express';
import {
  passwordSalter,
  random,
  generateAccessToken,
  generateUserId,
} from '../utils/authUtils';
import { UserServices } from '../services/user.serviceImpl';
import { UserProps } from 'types/types';
import { buildRegistrationResponse } from '../dtos/RegistrationResponseDTO';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400);
    }

    // Check if user already exists
    const existingUser = await UserServices.fetchUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email Already Registered' });
    }

    // Prepare salt for pw
    const salt = random();

    const newId = generateUserId();

    // build new User object for DB
    const newUser: UserProps | null = await UserServices.createUser({
      userId: newId,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passwordSalter(salt, password),
      salt: salt,
      role: 'User',
    });

    // Generate JWT
    const token = generateAccessToken(newUser);
    const registrationResponseDTO = buildRegistrationResponse(newUser);

    return res
      .status(201)
      .json({ user: registrationResponseDTO, token: token });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log('Initiate login with email: ', email);
    console.log('Initiate login with password: ', password);
    if (!email || !password) {
      return res.status(400).json({
        error: 'E-mail and password required.',
      });
    }

    const user = await UserServices.fetchUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        error: 'Unable to locate an account with the provided e-mail address.',
      });
    }

    const expectedHash = passwordSalter(user.salt, password);
    if (user.password != expectedHash) {
      return res.status(403).json({
        error:
          'Invalid username/password. Please check your credentials and try again.',
      });
    }

    // Generate JWT
    const token = generateAccessToken(user);
    const registrationResponseDTO = buildRegistrationResponse(user);

    return res
      .status(200)
      .json({ user: registrationResponseDTO, token: token });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
