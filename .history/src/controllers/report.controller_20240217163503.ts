import { Request, Response } from 'express';
import { ReportServices } from '../services/report.serviceImpl';

class ReportController {
  async requestApptDtldReport(req: Request, res: Response) {
    try {
      // const queryParams = req.query;
      const apptDtldReport = await ReportServices.generateApptDtldReport();
      console.log('ReportController -> requestApptDtldReport [Success]');
      return res.status(200).json(apptDtldReport);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async requestApptSmmrReport(req: Request, res: Response) {
    try {
      // const queryParams = req.query;
      const apptSmmrReport = await ReportServices.generateApptSmmrReport();
      console.log('ReportController -> requestApptSmmrReport [Success]');
      return res.status(200).json(apptSmmrReport);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async requestReportsByQuery(req: Request, res: Response) {
    try {
      const queryParams = req.query; // Get query parameters from request
      const reports = await ReportServices.fetchReports(queryParams);
      console.log('ReportController -> requestReportsByQuery [Success]');
      return res.status(200).json(reports);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const reportController = new ReportController();
