// /* Generate Key utils */
// enum BotEnum {
//   appointment = 'appt',
//   billing = 'bill',
// }

// enum ReportTypeEnum {
//   detailed = 'dtld',
//   summary = 'smmr',
// }

// const getBotValue = (bot: BotType) => {
//   let botValue = '';
//   if (bot === 'appointment') botValue = BotEnum.appointment;
//   else if (bot === 'billing') botValue = BotEnum.billing;
//   return botValue;
// };

// const getReportTypeValue = (reportType: ReportType) => {
//   let reportTypeValue = '';
//   if (reportType === 'detailed') reportTypeValue = ReportTypeEnum.detailed;
//   else if (reportType === 'summary') reportTypeValue = ReportTypeEnum.summary;
//   return reportTypeValue;
// };

// const getDateValue = (date: string) => {
//   const [year, month, day] = date.split('-');
//   return `${year}${month}${day}`;
// };

// export const generateKey = (
//   bot: BotType,
//   reportType: ReportType,
//   date: string
// ) => {
//   const botValue = getBotValue(bot);
//   const reportTypeValue = getReportTypeValue(reportType);
//   const dateValue = getDateValue(date);
//   const key = `${botValue}${reportTypeValue}${dateValue}`;

//   return key;
// };
