// controllers/auth.controller.ts
import express from 'express';
import {
  passwordSalter,
  random,
  generateAccessToken,
  generateUserId,
} from '../utils/authUtils';
import { UserServices } from '../services/user.service';
import { UserProps } from 'types/commonTypes';
import { buildRegistrationResponse } from '../dtos/RegistrationResponseDTO';
import { buildLoginResponse } from '../dtos/LoginDTO';

const successfulLoginMessage = 'Logged in successfully 😊👌';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400);
    }

    // Check if user already exists
    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await UserServices.fetchUserByEmail(lowerCaseEmail);

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

    return res.status(201).json({
      user: registrationResponseDTO,
      token: token,
      message: successfulLoginMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log('Initiating login with email:', email);

    if (!email || !password) {
      return res.status(400).json({
        error: 'E-mail and password required.',
      });
    }
    const lowerCaseEmail = email.toLowerCase();
    const user = await UserServices.fetchUserByEmail(lowerCaseEmail);

    if (user === null) {
      return res.status(404).json({
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
    const LoginResponseDTO = buildLoginResponse(user);

    return res.status(200).json({
      message: 'Logged in successfully 😊👌',
      user: LoginResponseDTO,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    return res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'Successfully logged out 😏 🍀', token: '', user: '' });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
