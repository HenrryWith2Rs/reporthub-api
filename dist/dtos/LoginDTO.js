"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLoginResponse = void 0;
const buildLoginResponse = (user) => {
    return {
        sub: user.userId,
        name: user.firstName,
        role: user.role,
    };
};
exports.buildLoginResponse = buildLoginResponse;
//# sourceMappingURL=LoginDTO.js.map