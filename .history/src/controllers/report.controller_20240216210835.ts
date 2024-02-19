import { Request, Response } from 'express';
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';

export const generateApptDtldReport = () => {};

class ReportController {
  // Get all Users with optional dynamic query
  async generateReport(req: Request, res: Response) {
    try {
      // const queryParams = req.query;
      const apptDtldReport = randomizeApptDtldData();
      return res.status(200).json(apptDtldReport);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

//export class
export const reportController = new ReportController();
