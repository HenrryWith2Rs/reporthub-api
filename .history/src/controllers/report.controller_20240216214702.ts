import { Request, Response } from 'express';
import { ReportServices } from '../services/report.serviceImpl';

export const generateApptDtldReport = () => {};

class ReportController {
  // Get all Users with optional dynamic query
  async generateReport(req: Request, res: Response) {
    try {
      // const queryParams = req.query;
      const apptDtldReport = await ReportServices.generateApptDtldReport();
      return res.status(200).json(apptDtldReport);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const reportController = new ReportController();
