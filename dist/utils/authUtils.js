"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserId = exports.verifyAccessToken = exports.generateAccessToken = exports.random = exports.passwordSalter = void 0;
// utils/authUtils
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
const passwordSalter = (salt, password) => {
    return crypto_1.default
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET)
        .digest('hex');
};
exports.passwordSalter = passwordSalter;
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
const generateAccessToken = (user) => {
    const payload = {
        sub: user.userId,
        name: user.firstName,
        role: user.role,
    };
    const secret = process.env.SECRET;
    const options = { expiresIn: '8h' };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    const secret = process.env.SECRET;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
};
exports.verifyAccessToken = verifyAccessToken;
const generateUserId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const userIdLength = 7;
    let userId = '';
    for (let i = 0; i < userIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userId += characters[randomIndex];
    }
    return userId;
};
exports.generateUserId = generateUserId;
//# sourceMappingURL=authUtils.js.map