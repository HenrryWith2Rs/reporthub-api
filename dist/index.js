"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import cookieParser from 'cookie-parser';
dotenv_1.default.config();
const db_config_1 = require("./db/db.config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT; // Default to port 3000 if PORT is not set
const originDev = process.env.ORIGIN_DEV;
const originAWS = process.env.ORIGIN_AWS;
const originVercel = process.env.ORIGIN_VERCEL;
// CORS options
const allowedOrigins = [originDev, originAWS, originVercel];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
// middleware
app.use((0, cors_1.default)(corsOptions)); // Enable CORS before other middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(cookieParser()); // Parse cookies
app.use('/api', (0, routes_1.default)()); // Route handling
async function initializeApp() {
    // Start express app
    try {
        // initialize db
        await (0, db_config_1.connectToDB)();
        console.log(corsOptions);
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