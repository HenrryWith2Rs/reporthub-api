"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReportById = exports.updateReportById = exports.getReportById = exports.queryByParams = exports.getReports = exports.getReportByKey = exports.createReport = void 0;
// services/document.service.ts
const reports_1 = require("../models/reports");
/* Document Actions */
// Create
const createReport = async (report) => await reports_1.ReportModel.create(report);
exports.createReport = createReport;
// Read
const getReportByKey = (key) => reports_1.ReportModel.findOne({ key });
exports.getReportByKey = getReportByKey;
const getReports = (queryParams) => {
    // Construct the query based on the provided parameters
    const query = queryParams ? { ...queryParams } : {};
    return reports_1.ReportModel.find(query);
};
exports.getReports = getReports;
const queryByParams = (dateStart, dateEnd, bot, reportType) => {
    reports_1.ReportModel.find({
        date: { $gte: dateStart, $lte: dateEnd },
        bot: bot,
        reportType: reportType,
    }).select('date resultSet');
};
exports.queryByParams = queryByParams;
const getReportById = (id) => reports_1.ReportModel.findById({ _id: id });
exports.getReportById = getReportById;
// Update
const updateReportById = (id, values) => reports_1.ReportModel.findByIdAndUpdate(id, values);
exports.updateReportById = updateReportById;
// Delete
const deleteReportById = (id) => reports_1.ReportModel.findOneAndDelete({ _id: id });
exports.deleteReportById = deleteReportById;
//# sourceMappingURL=report.service.js.map