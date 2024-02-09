"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const db_config_1 = require("./config/db.config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
const origin = process.env.ORIGIN || 'http://localhost:5173'; // Default to localhost if ORIGIN is not set
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: origin }));
app.use('/api', (0, routes_1.default)());
async function initializeApp() {
    // Start express app
    try {
        // initialize db
        await (0, db_config_1.connectToDB)();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to initialize App -> ', error);
        process.exit(1);
    }
}
// initialize app
initializeApp();
// Handle shutdown or cleanup
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing App and exiting');
    process.exit();
});
//# sourceMappingURL=index.js.map