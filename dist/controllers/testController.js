"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPost = exports.testGet = void 0;
const testGet = async (req, res) => {
    try {
        const { email, password } = req.query;
        console.log('email', email);
        console.log('password', password);
        const user = {
            email: email,
            password: password,
        };
        return res.status(200).json(user);
    }
    catch (error) {
        console.log('Error on testGet -> ', error);
        return res.status(400).json(error);
    }
};
exports.testGet = testGet;
const testPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email', email);
        console.log('password', password);
        const user = {
            email: email,
            password: password,
        };
        return res.status(200).json(user);
    }
    catch (error) {
        console.log('Error on testPost -> ', error);
        return res.status(400).json(error);
    }
};
exports.testPost = testPost;
//# sourceMappingURL=testController.js.map