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

      // If date is for today, return results but don't upload
      const today = new Date().toISOString().split('T')[0];
      if (dateStart === today) {
        console.log('today');
        const resultSet = await selectFunction(bot, reportType, format);
        console.log(typeof resultSet);
        // return [{ date: dateStart, resultSet: resultSet }];
        res.status(200).json(resultSet);
      }

      // const reports = await ReportServices.fetchOrUpload(
      //   dateStart,
      //   dateEnd,
      //   bot,
      //   reportType
      // );
      console.log('ReportController -> requestReportsByQuery [Success]');
      return res.status(200).json();
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

const selectFunction = async (
  bot: string,
  reportType: string,
  format: string
) => {
  const lookupTable: {
    [key: string]: {
      [key: string]: {
        [key: string]: () => Promise<any[]>;
      };
    };
  } = {
    appointment: {
      detailed: {
        json: async () => await ReportServices.generateApptDtldReport(),
        // html: async () => console.log('Function for appointment, detailed, html'),
      },
      summary: {
        json: async () => await ReportServices.generateApptSmmrReport(),
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
    } catch (error) {
      console.error('Error executing function:', error);
    }
  } else {
    console.log('No function found for the specified parameters');
  }
};

//export class
export const reportController = new ReportController();
