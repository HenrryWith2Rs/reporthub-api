"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testController_1 = require("../controllers/testController");
exports.default = (router) => {
    router.get('/testGet', testController_1.testGet);
    router.post('/testPost', testController_1.testPost);
};
//# sourceMappingURL=testRoutes.js.map