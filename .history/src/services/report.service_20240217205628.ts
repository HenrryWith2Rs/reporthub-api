// services/document.service.ts
import { ReportModel } from '../models/reports';
import { ReportProps } from '../types/types';

/* Document Actions */

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

export const queryByParams = (
  dateStart: string,
  dateEnd: string,
  botType: string,
  reportType: string
) => {};
export const getReportById = (id: string) => ReportModel.findById({ _id: id });

// Update
export const updateReportById = (id: string, values: ReportProps) =>
  ReportModel.findByIdAndUpdate(id, values);

// Delete
export const deleteReportById = (id: string) =>
  ReportModel.findOneAndDelete({ _id: id });
