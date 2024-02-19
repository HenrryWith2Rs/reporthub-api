// services/report.service.ts
import { ReportModel } from '../models/reports';
import { ReportProps } from '../types/types';

/* Report Actions */

// Create
export const createReport = async (report: ReportProps) =>
  await ReportModel.create(report);

// Read
export const getReportByKey = (key: string) => ReportModel.findOne({ key });
export const getReports = (queryParams?: Partial<ReportProps>) => {
  // Construct the query based on the provided parameters
  const query = queryParams ? { ...queryParams } : {};
  return ReportModel.find(query);
};
export const queryByParams = async (
  dateStart: string,
  dateEnd: string,
  bot: string,
  reportType: string
) => {
  await ReportModel.find({
    bot: bot,
    reportType: reportType,
  });
};

export const getReportById = (id: string) => ReportModel.findById({ _id: id });

// Update
export const updateReportById = (id: string, values: ReportProps) =>
  ReportModel.findByIdAndUpdate(id, values);

// Delete
export const deleteReportById = (id: string) =>
  ReportModel.findOneAndDelete({ _id: id });
