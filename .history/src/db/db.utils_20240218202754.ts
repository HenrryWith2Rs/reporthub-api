/* Generate Key utils */
const getBotValue = (bot: string) => {
  let botValue = '';
  if (bot === 'appointment') botValue = 'appt';
  else if (bot === 'billing') botValue = 'bill';
  return botValue;
};

const getReportValue = (string: string) => {
  let stringValue = '';
  if (string === 'detailed') stringValue = 'dtld';
  else if (string === 'summary') stringValue = 'smmr';
  return stringValue;
};

const getDateValue = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${year}${month}${day}`;
};

export const generateKey = (date: string, bot: string, reportType: string) => {
  const botValue = getBotValue(bot);
  const reportValue = getReportValue(reportType);
  const dateValue = getDateValue(date);
  const key = `${botValue}${reportValue}${dateValue}`;
  return key;
};
