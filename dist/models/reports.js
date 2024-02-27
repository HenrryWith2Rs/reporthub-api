"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModel = void 0;
// models/report.ts
const mongoose_1 = require("mongoose");
// User Config
const ReportSchema = new mongoose_1.Schema({
    key: { type: String, unique: true },
    date: { type: String, unique: true },
    bot: { type: String },
    reportType: { type: String },
    resultSet: { type: Array },
});
//creating a model
exports.ReportModel = (0, mongoose_1.model)('Report', ReportSchema);
//# sourceMappingURL=reports.js.map