"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
// config/db.config.ts
//importing modules
const mongoose_1 = __importDefault(require("mongoose"));
//details from the env
const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const dbName = 'ReportHub';
//connection string to mongo atlas
const connectionString = `mongodb+srv://${username}:${password}@clusterr0.xuxqyuv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};
const connectToDB = async () => {
    try {
        const res = await mongoose_1.default.connect(connectionString, options);
        if (res) {
            console.log(`Database connection successful... dbName ->  ${dbName}`);
        }
    }
    catch (err) {
        console.error(err);
    }
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=db.config.js.map