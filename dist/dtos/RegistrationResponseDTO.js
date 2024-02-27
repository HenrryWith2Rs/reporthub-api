"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRegistrationResponse = void 0;
const buildRegistrationResponse = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
    };
};
exports.buildRegistrationResponse = buildRegistrationResponse;
//# sourceMappingURL=RegistrationResponseDTO.js.map