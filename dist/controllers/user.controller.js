"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
// controllers/user.controller.ts
const user_serviceImpl_1 = require("../services/user.serviceImpl");
const users_1 = require("../models/users");
class UserController {
    // Add User controller
    async addUser(req, res) {
        try {
            // get values
            const { firstName, lastName, username, email, password } = req.body;
            // check if a value is missing
            if (!firstName || !lastName || !username || !email || !password)
                return res.status(400).json({ error: 'missing a required field' });
            // Check if a User with the provided Email already exists
            const existingUser = await user_serviceImpl_1.UserServices.fetchUserByEmail(email);
            if (!existingUser) {
                return res
                    .status(400)
                    .json({ error: 'A User with this Email already exists' });
            }
            // create data obj
            const data = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            //validate the request
            const { error, value } = users_1.UserSchemaValidate.validate(data);
            if (error) {
                return res.status(400).json({ error: `error validata data: ${error}` });
            }
            else {
                //call the create User function in the service and pass the data from the request
                const user = await user_serviceImpl_1.UserServices.createUser(value);
                return res.status(201).json(user);
            }
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get all Users with optional dynamic query
    async getUsers(req, res) {
        try {
            const queryParams = req.query; // Get query parameters from request
            const users = await user_serviceImpl_1.UserServices.fetchUsers(queryParams);
            return res.status(200).json(users);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get a single User
    async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await user_serviceImpl_1.UserServices.fetchUserById(id);
            return res.status(200).json(user);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get Users with autocomplete
    async autocompleteUsers(req, res) {
        try {
            const query = req.query.q;
            if (!query) {
                return res
                    .status(400)
                    .json({ error: 'Query parameter "q" is required' });
            }
            const matchingUsers = await user_serviceImpl_1.UserServices.autocompleteForUsers(query);
            return res.status(200).json(matchingUsers);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Update User
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const user = await user_serviceImpl_1.UserServices.updateUserById(id, req.body);
            return res.status(200).json(user);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Delete a User
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const user = await user_serviceImpl_1.UserServices.deleteUserById(id);
            return res.status(200).json(user);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
//export class
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map