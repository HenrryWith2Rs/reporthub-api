"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const authUtils_1 = require("../utils/authUtils");
const user_serviceImpl_1 = require("../services/user.serviceImpl");
const RegistrationResponseDTO_1 = require("../dtos/RegistrationResponseDTO");
const LoginDTO_1 = require("../dtos/LoginDTO");
const successfulLoginMessage = 'Logged in successfully 😊👌';
const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400);
        }
        // Check if user already exists
        const existingUser = await user_serviceImpl_1.UserServices.fetchUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email Already Registered' });
        }
        // Prepare salt for pw
        const salt = (0, authUtils_1.random)();
        const newId = (0, authUtils_1.generateUserId)();
        // build new User object for DB
        const newUser = await user_serviceImpl_1.UserServices.createUser({
            userId: newId,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: (0, authUtils_1.passwordSalter)(salt, password),
            salt: salt,
            role: 'User',
        });
        // Generate JWT
        const token = (0, authUtils_1.generateAccessToken)(newUser);
        const registrationResponseDTO = (0, RegistrationResponseDTO_1.buildRegistrationResponse)(newUser);
        return res.status(201).json({
            user: registrationResponseDTO,
            token: token,
            message: successfulLoginMessage,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Initiating login with email:', email);
        if (!email || !password) {
            return res.status(400).json({
                error: 'E-mail and password required.',
            });
        }
        const lowerCaseEmail = email.toLowerCase();
        const user = await user_serviceImpl_1.UserServices.fetchUserByEmail(lowerCaseEmail);
        if (user === null) {
            return res.status(404).json({
                error: 'Unable to locate an account with the provided e-mail address.',
            });
        }
        const expectedHash = (0, authUtils_1.passwordSalter)(user.salt, password);
        if (user.password != expectedHash) {
            return res.status(403).json({
                error: 'Invalid username/password. Please check your credentials and try again.',
            });
        }
        // Generate JWT
        const domain = process.env.DOMAIN_DEV;
        const token = (0, authUtils_1.generateAccessToken)(user);
        const LoginResponseDTO = (0, LoginDTO_1.buildLoginResponse)(user);
        return (res
            // .cookie('access_token', token, {
            //   httpOnly: true,
            //   maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age,
            //   domain: 'localhost',
            //   sameSite: 'lax',
            // })
            .status(200)
            .json({
            message: 'Logged in successfully 😊👌',
            user: LoginResponseDTO,
            token: token,
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        return res
            .clearCookie('access_token')
            .status(200)
            .json({ message: 'Successfully logged out 😏 🍀', token: '', user: '' });
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
};
exports.logout = logout;
/*
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

    // return res
    //   .status(201)
    //   .cookie(authString, token, { domain: "2Rs", path: "/" })
    //   .json(registrationResponseDTO)
    return res
      .cookie('access_token', token, {
        domain: '2Rs',
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'Logged in successfully 😊👌' });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
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
    const registrationResponseDTO = buildRegistrationResponse(user);

    console.log('Login successful');

    return res
      .cookie('access_token', token, {
        domain: 'localhost',
        httpOnly: true,
      })
      .status(200)
      .json({
        message: 'Logged in successfully 😊👌',
        user: registrationResponseDTO,
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
      .json({ message: 'Successfully logged out 😏 🍀' });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
*/
//# sourceMappingURL=auth.controller.js.map