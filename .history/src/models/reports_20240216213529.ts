// models/users.ts
import { Schema, model } from 'mongoose';
import { ReportProps } from '../types/types';

// User Config
const ReportSchema = new Schema({
  reportId: { type: String, unique: true },
  date: { type: String, unique: true },
  bot: { type: String },
  reportType: { type: String },
  resultSet: { type: Array },
});

//creating a model
export const ReportModel = model<ReportProps>('Report', ReportSchema);
