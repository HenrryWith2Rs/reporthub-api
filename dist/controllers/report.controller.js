"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const report_serviceImpl_1 = require("../services/report.serviceImpl");
class ReportController {
    async requestApptDtldReport(req, res) {
        try {
            // const queryParams = req.query;
            const apptDtldReport = await report_serviceImpl_1.ReportServices.generateApptDtldReport();
            console.log('ReportController -> requestApptDtldReport [Success]');
            return res.status(200).json(apptDtldReport);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async requestApptSmmrReport(req, res) {
        try {
            // const queryParams = req.query;
            const apptSmmrReport = await report_serviceImpl_1.ReportServices.generateApptSmmrReport();
            console.log('ReportController -> requestApptSmmrReport [Success]');
            return res.status(200).json(apptSmmrReport);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async requestReportsByQuery(req, res) {
        try {
            // const queryParams = req.query; // Get query parameters from request
            const { dateStart, dateEnd, bot, reportType } = req.query;
            const results = await report_serviceImpl_1.ReportServices.fetchReportsByQuery(dateStart, dateEnd, bot, reportType);
            console.log('ReportController -> requestReportsByQuery [Success]');
            return res.status(200).json(results);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateReport(req, res) {
        try {
            const id = req.params.id;
            const report = await report_serviceImpl_1.ReportServices.updateDocument(id, req.body);
            console.log('id', id);
            console.log('ReportController -> updateReport [Success]');
            return res.status(200).json(report);
        }
        catch (error) {
            console.error('Error -> ', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
//export class
exports.reportController = new ReportController();
//# sourceMappingURL=report.controller.js.map