// services/user.serviceImpl.ts
import { randomizeApptDtldData } from '../scripts/kore/appointment/detailed/apptDtldFunctions';
import { randomizeApptSmmrData } from '../scripts/kore/appointment/summary/apptSmmrFunctions';

class ReportService {
  async generateApptDtldReport() {
    try {
      const report = randomizeApptDtldData();
      console.log('ReportService -> randomizeApptDtldData [Success]');
      return report;
    } catch (error) {
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
      console.log(error);
      throw error;
    }
  }
}

//export the class
export const ReportServices = new ReportService();
