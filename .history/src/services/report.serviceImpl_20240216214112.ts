// services/user.serviceImpl.ts
import { UserModel } from '../models/users';
import { QueryItem } from '../types/types';
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';

class ReportService {
  async generateApptDtldReport() {
    try {
      const report = randomizeApptDtldData();
      return report;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//export the class
export const ReportServices = new ReportService();
