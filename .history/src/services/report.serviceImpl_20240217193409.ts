// services/report.serviceImpl.ts
import { createReport, getReportById, getReports, updateReportById } from './report.service';
import { ReportProps } from '../types/types';
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';
import { randomizeApptSmmrData } from '../scripts/kore/appointment/summary/apptSmmrFunctions';
import { generateKey } from '../db/db.utils';

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

  async updateDocument(
    id: string, report: ReportProps
  ) {
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

//export the class
export const ReportServices = new ReportService();
