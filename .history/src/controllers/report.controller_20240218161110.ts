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
      // const queryParams = req.query; // Get query parameters from request
      const { dateStart, dateEnd, bot, reportType } = req.query as {
        dateStart: string;
        dateEnd: string;
        bot: string;
        reportType: string;
      };
      const format = 'json';
      const callBackFunction = selectFunction(bot, reportType, format);
      console.log(callBackFunction);
      // const reports = await ReportServices.fetchReports(queryParams);
      const reports = await ReportServices.fetchOrUpload(
        dateStart,
        dateEnd,
        bot,
        reportType
      );
      console.log('ReportController -> requestReportsByQuery [Success]');
      return res.status(200).json(reports);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateReport(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const report = await ReportServices.updateDocument(id, req.body);
      console.log('id', id);
      console.log('ReportController -> updateReport [Success]');
      return res.status(200).json(report);
    } catch (error) {
      console.error('Error -> ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

const selectFunction = (bot: string, reportType: string, format: string) => {
  const lookupTable: {
    [key: string]: {
      [key: string]: {
        [key: string]: () => void;
      };
    };
  } = {
    appointment: {
      detailed: {
        json: () => console.log('Function for appointment, detailed, json'),
        html: () => console.log('Function for appointment, detailed, html'),
      },
      summary: {
        json: () => console.log('Function for appointment, summary, json'),
        html: () => console.log('Function for appointment, summary, html'),
      },
    },
    billing: {
      detailed: {
        json: () => console.log('Function for billing, detailed, json'),
        html: () => console.log('Function for billing, detailed, excel'),
      },
      summary: {
        json: () => console.log('Function for billing, summary, json'),
        html: () => console.log('Function for billing, summary, html'),
      },
    },
  };

  // Retrieve the function based on the provided parameters
  const selectedFunction = lookupTable[bot]?.[reportType]?.[format];

  // Check if the function exists and if it's callable
  if (selectedFunction && typeof selectedFunction === 'function') {
    // Execute the selected function
    selectedFunction();
  } else {
    console.log('No function found for the specified parameters');
  }
};

//export class
export const reportController = new ReportController();
