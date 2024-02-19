// services/user.serviceImpl.ts
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';
import { randomizeApptSmmrData } from '../scripts/kore/appointment/summary/apptSmmrFunctions';

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

  async generateApptSmmrReport() {
    try {
      const report = randomizeApptSmmrData();
      return report;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

//export the class
export const ReportServices = new ReportService();
