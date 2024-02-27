"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchemaValidate = void 0;
// models/users.ts
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// validation schema
exports.UserSchemaValidate = joi_1.default.object({
    username: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
// User Config
const UserSchema = new mongoose_1.Schema({
    userId: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String },
    role: {
        type: String,
        enum: ['Administrator', 'Moderator', 'User'],
        default: 'User',
    },
});
//creating a model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=users.js.map