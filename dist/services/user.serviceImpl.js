"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
// services/user.serviceImpl.ts
const users_1 = require("../models/users");
const user_service_1 = require("./user.service");
class UserService {
    // CREATE //
    // Create a User
    async createUser(data) {
        try {
            const newUser = await (0, user_service_1.createUser)(data);
            return newUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // READ //
    // Get Users with optional dynamic query
    async fetchUsers(queryParams) {
        try {
            const Users = await (0, user_service_1.getUsers)(queryParams);
            return Users;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // Get a single User by ID
    async fetchUserById(id) {
        try {
            const User = await (0, user_service_1.getUserById)(id);
            return !User ? 'User not found' : User;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // Get a single User by Email
    async fetchUserByEmail(email) {
        try {
            const response = await (0, user_service_1.getUserByEmail)(email);
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // Get all Users by autocomplete
    async autocompleteForUsers(query) {
        try {
            const matchingUsers = await users_1.UserModel.find({
                $or: [
                    { firstName: { $regex: new RegExp(query, 'i') } },
                    { lastName: { $regex: new RegExp(query, 'i') } },
                    { username: { $regex: new RegExp(query, 'i') } },
                    { email: { $regex: new RegExp(query, 'i') } },
                    { password: { $regex: new RegExp(query, 'i') } },
                ],
            }).limit(10);
            return !matchingUsers ? 'No results' : matchingUsers;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // UPDATE //
    // Update a User by ID
    async updateUserById(id, values) {
        try {
            // Update the User
            let user = await (0, user_service_1.updateUserById)(id, values);
            // Fetch the updated User
            user = await (0, user_service_1.getUserById)(id);
            return !user ? 'User not available' : user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    // DELETE //
    // Delete a User by ID
    async deleteUserById(id) {
        try {
            const user = await (0, user_service_1.deleteUserById)(id);
            return !user ? 'User not available' : user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
//export the class
exports.UserServices = new UserService();
//# sourceMappingURL=user.serviceImpl.js.map