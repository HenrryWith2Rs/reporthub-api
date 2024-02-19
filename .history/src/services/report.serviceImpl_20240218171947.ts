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
import { CfnLogGroup } from 'aws-cdk-lib/aws-logs';

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

  async fetchOrUpload(
    dateStart: string,
    dateEnd: string,
    bot: string,
    reportType: string
  ) {
    let results: any[] | null;

    // If date is for today, return results but don't upload
    const today = new Date().toISOString().split('T')[0];
    if (dateStart === today) {
      console.log('today');
    }
    return results;

    // const response = await ReportModel.find({
    //   date: { $gte: dateStart, $lte: dateEnd },
    //   bot: bot,
    //   reportType: reportType,
    // }).select('date resultSet');
  }
}

//export the class
export const ReportServices = new ReportService();
