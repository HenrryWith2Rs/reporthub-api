"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.getUserByEmail = exports.createUser = void 0;
// services/user.service.ts
const users_1 = require("../models/users");
/* User Actions */
// Create
const createUser = async (user) => await users_1.UserModel.create(user);
exports.createUser = createUser;
// Read
const getUserByEmail = (email) => users_1.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUsers = (queryParams) => {
    // Construct the query based on the provided parameters
    const query = queryParams ? { ...queryParams } : {};
    return users_1.UserModel.find(query);
};
exports.getUsers = getUsers;
const getUserById = (id) => users_1.UserModel.findById({ _id: id });
exports.getUserById = getUserById;
// Update
const updateUserById = (id, values) => users_1.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
// Delete
const deleteUserById = (id) => users_1.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user.service.js.map