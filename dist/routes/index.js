"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router/index.ts
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("./testRoutes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
const router = express_1.default.Router();
exports.default = () => {
    (0, testRoutes_1.default)(router);
    (0, post_routes_1.default)(router);
    (0, user_routes_1.default)(router);
    (0, auth_routes_1.default)(router);
    (0, report_routes_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map