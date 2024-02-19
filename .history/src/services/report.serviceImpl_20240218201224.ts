// services/report.serviceImpl.ts
import {
  createReport,
  getReportById,
  getReportByKey,
  getReports,
  queryByParams,
  updateReportById,
} from './report.service';
import { ReportProps } from '../types/types';
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';
import { randomizeApptSmmrData } from '../scripts/kore/appointment/summary/apptSmmrFunctions';
import { generateKey } from '../db/db.utils';
import { ReportModel } from '../models/reports';
import { getToday } from '../utils/dateUtils';

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
      // Generate the key for the report
      const key = generateKey(date, bot, reportType);

      // Check if the report already exists using the key
      const existingReport = await getReportByKey(key);

      // If the report already exists, return without creating a new one
      if (existingReport) {
        console.log('Report already exists:', key);
        return existingReport;
      }

      // If the report doesn't exist, create a new one
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
      let dbResults;
      let counter = 0;

      // If date is for today, return results but don't upload
      const today = getToday();
      if (dateStart === today) {
        dbResults = await selectFunction(bot, reportType, 'json');
        return { date: dateStart, dbResults };
      }

      console.log('today', today);

      while (!dbResults) {
        // (1) query DB to check if data exists
        dbResults = await ReportModel.find({
          date: { $gte: dateStart, $lte: dateEnd },
          bot: bot,
          reportType: reportType,
        }).select('date resultSet');

        console.log('dbResults', dbResults);
        // (2) check if result is empty array
        if (dbResults && Array.isArray(dbResults) && dbResults.length > 0) {
          // console.log('dbResults has data:', dbResults.length);
          return { date: dateStart, dbResults };
        } else if (dateEnd === dateStart && dateStart < today) {
          // (3) no data was found in the db, proceed to generate report manually
          console.log('No entries found for provided parameters');
          console.log('Now compiling report');
          const resultSet = await selectFunction(bot, reportType, 'json');

          // (4) upload resultSet to db
          await this.createDocument(dateStart, bot, reportType, resultSet);

          // Logging for clarity
          console.log('Uploaded data to Couchbase. Checking again...');
        } else {
          console.log('Unable to complete your request');
          return { message: 'Unable to complete your request' };
        }
      }

      return dbResults;
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
