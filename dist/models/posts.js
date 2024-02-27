"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.PostschemaValidate = void 0;
// models/posts.ts
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// validation schema
exports.PostschemaValidate = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    published: joi_1.default.boolean().required(),
    isbn: joi_1.default.string().required(),
});
// Postschema
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    isbn: {
        type: String,
        required: true,
    },
});
//creating a model
exports.PostModel = (0, mongoose_1.model)('Post', PostSchema);
//# sourceMappingURL=posts.js.map