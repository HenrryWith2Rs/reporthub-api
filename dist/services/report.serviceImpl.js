"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportServices = void 0;
// services/report.serviceImpl.ts
const report_service_1 = require("./report.service");
const apptDtldFunctions_1 = require("../scripts/kore/appointment/detailed/apptDtldFunctions");
const apptSmmrFunctions_1 = require("../scripts/kore/appointment/summary/apptSmmrFunctions");
const db_utils_1 = require("../db/db.utils");
const reports_1 = require("../models/reports");
const dateUtils_1 = require("../utils/dateUtils");
class ReportService {
    async generateApptDtldReport() {
        try {
            const report = (0, apptDtldFunctions_1.randomizeApptDtldData)();
            console.log('ReportService -> generateApptDtldReport [Success]');
            return report;
        }
        catch (error) {
            console.log('ReportService -> generateApptDtldReport [Failure]');
            console.log(error);
            throw error;
        }
    }
    async generateApptSmmrReport() {
        try {
            const report = (0, apptSmmrFunctions_1.randomizeApptSmmrData)();
            console.log('ReportService -> generateApptSmmrReport [Success]');
            return report;
        }
        catch (error) {
            console.log('ReportService -> generateApptSmmrReport [Failure]');
            console.log(error);
            throw error;
        }
    }
    async fetchReports(queryParams) {
        try {
            const reports = await (0, report_service_1.getReports)(queryParams);
            console.log('ReportService -> fetchReports [Success]');
            return reports;
        }
        catch (error) {
            console.log('ReportService -> fetchReports [Failure]');
            console.log(error);
            throw error;
        }
    }
    async createDocument(date, bot, reportType, resultSet) {
        try {
            // Generate the key for the report
            const key = (0, db_utils_1.generateKey)(date, bot, reportType);
            console.log(key);
            // Check if the report already exists using the key
            const existingReport = await (0, report_service_1.getReportByKey)(key);
            // If the report already exists, return without creating a new one
            if (existingReport) {
                console.log('Report already exists:', key);
                return existingReport;
            }
            // If the report doesn't exist, create a new one
            const newReport = {
                key: key,
                date: date,
                bot: bot,
                reportType: reportType,
                resultSet: resultSet,
            };
            // Create the new report
            const response = await (0, report_service_1.createReport)(newReport);
            console.log('ReportService -> createDocument [Success]');
            return response;
        }
        catch (error) {
            console.log('ReportService -> createDocument [Failure]');
            console.log(error);
        }
    }
    async updateDocument(id, report) {
        try {
            // Update the post
            let document = await (0, report_service_1.updateReportById)(id, report);
            // Fetch the updated post
            document = await (0, report_service_1.getReportById)(id);
            console.log('ReportService -> updateDocument [Success]');
            return !document ? 'Document not available' : document;
        }
        catch (error) {
            console.log('ReportService -> updateDocument [Failure]');
            console.log(error);
        }
    }
    async fetchReportsByQuery(dateStart, dateEnd, bot, reportType) {
        try {
            let dbResults;
            // If date is for today, return results but don't upload
            const today = (0, dateUtils_1.getToday)();
            if (dateStart === today) {
                dbResults = await selectFunction(bot, reportType, 'json');
                return { date: dateStart, dbResults };
            }
            while (true) {
                // (1) query DB to check if data exists
                dbResults = await reports_1.ReportModel.find({
                    date: { $gte: dateStart, $lte: dateEnd },
                    bot: bot,
                    reportType: reportType,
                }).select('date resultSet -_id');
                // (2) check if result is empty array
                if (dbResults && Array.isArray(dbResults) && dbResults.length > 0) {
                    // return if so
                    return dbResults;
                }
                else if (dateEnd === dateStart && dateStart < today) {
                    // (3) no data was found in the db, proceed to generate report manually
                    console.log('No entries found for provided parameters');
                    console.log('Now compiling report');
                    const resultSet = await selectFunction(bot, reportType, 'json');
                    // (4) upload resultSet to db
                    await this.createDocument(dateStart, bot, reportType, resultSet);
                    // Logging for clarity
                    console.log('Uploaded data to Couchbase. Checking again...');
                }
                else {
                    console.log('Unable to complete your request');
                    return { message: 'Unable to complete your request' };
                }
            }
        }
        catch (error) {
            console.log('ReportService -> fetchReportsByQuery [Failure]');
            console.log(error);
        }
    }
}
const selectFunction = async (bot, reportType, format) => {
    const lookupTable = {
        appointment: {
            detailed: {
                json: async () => await exports.ReportServices.generateApptDtldReport(),
                // html: async () => console.log('Function for appointment, detailed, html'),
            },
            summary: {
                json: async () => await exports.ReportServices.generateApptSmmrReport(),
                // html: async () => console.log('Function for appointment, summary, html'),
            },
        },
        // billing: {
        //   detailed: {
        //     json: async () => console.log('Function for billing, detailed, json'),
        //     html: async () => console.log('Function for billing, detailed, excel'),
        //   },
        //   summary: {
        //     json: async () => console.log('Function for billing, summary, json'),
        //     html: async () => console.log('Function for billing, summary, html'),
        //   },
        // },
    };
    // Retrieve the function based on the provided parameters
    const selectedFunction = lookupTable[bot]?.[reportType]?.[format];
    // Check if the function exists and if it's callable
    if (selectedFunction && typeof selectedFunction === 'function') {
        try {
            // Execute the selected function
            return await selectedFunction();
        }
        catch (error) {
            console.error('Error executing function:', error);
        }
    }
    else {
        console.log('No function found for the specified parameters');
    }
};
//export the class
exports.ReportServices = new ReportService();
//# sourceMappingURL=report.serviceImpl.js.map