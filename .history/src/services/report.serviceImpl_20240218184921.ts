// services/report.serviceImpl.ts
import {
  createReport,
  getReportById,
  getReports,
  queryByParams,
  updateReportById,
} from './report.service';
import { ReportProps } from '../types/types';
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';
import { randomizeApptSmmrData } from '../scripts/kore/appointment/summary/apptSmmrFunctions';
import { generateKey } from '../db/db.utils';
import { ReportModel } from '../models/reports';

class ReportService {
  async generateApptDtldReport() {
    try {
      const report = randomizeApptDtldData();
      console.log('ReportService -> generateApptDtldReport [Success]');
      return report;
    } catch (error) {
      console.log('ReportService -> generateApptDtldReport [Failure]');
      console.log(error);
      throw error;
    }
  }

  async generateApptSmmrReport() {
    try {
      const report = randomizeApptSmmrData();
      console.log('ReportService -> generateApptSmmrReport [Success]');
      return report;
    } catch (error) {
      console.log('ReportService -> generateApptSmmrReport [Failure]');
      console.log(error);
      throw error;
    }
  }

  async fetchReports(queryParams?: Partial<ReportProps>) {
    try {
      const reports = await getReports(queryParams);
      console.log('ReportService -> fetchReports [Success]');
      return reports;
    } catch (error) {
      console.log('ReportService -> fetchReports [Failure]');
      console.log(error);
      throw error;
    }
  }

  async createDocument(
    date: string,
    bot: string,
    reportType: string,
    resultSet: any[]
  ) {
    try {
      const key = generateKey(date, bot, reportType);
      const newReport: ReportProps = {
        key: key,
        date: date,
        bot: bot,
        reportType: reportType,
        resultSet: resultSet,
      };
      const response = await createReport(newReport);
      console.log('ReportService -> createDocument [Success]');
      return response;
    } catch (error) {
      console.log('ReportService -> createDocument [Failure]');
      console.log(error);
    }
  }

  async updateDocument(id: string, report: ReportProps) {
    try {
      // Update the post
      let document = await updateReportById(id, report);
      // Fetch the updated post
      document = await getReportById(id);
      console.log('ReportService -> updateDocument [Success]');
      return !document ? 'Document not available' : document;
    } catch (error) {
      console.log('ReportService -> updateDocument [Failure]');
      console.log(error);
    }
  }

  async fetchReportsByQuery(
    dateStart: string,
    dateEnd: string,
    bot: string,
    reportType: string
  ) {
    try {
      let results;
      let counter = 0;

      // If date is for today, return results but don't upload
      const today = new Date().toISOString().split('T')[0];
      if (dateStart === today) {
        console.log('today');
        results = await selectFunction(bot, reportType, 'json');
        return { date: dateStart, results };
      }

      while (!results && counter < 3) {
        // (1) query DB to check if data exists
        const response = await ReportModel.find({
          date: { $gte: dateStart, $lte: dateEnd },
          bot: bot,
          reportType: reportType,
        }).select('date resultSet');
        counter++;
      }

      return results;
    } catch (error) {}
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

//export the class
export const ReportServices = new ReportService();
