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

export const generateKey = (bot: string, reportType: string, date: string) => {
  console.log('generateKey');
  console.log(bot);
  console.log(reportType);
  console.log(date);
  const botValue = getBotValue(bot);
  const stringValue = getReportValue(reportType);
  const dateValue = getDateValue(date);
  const key = `${botValue}${stringValue}${dateValue}`;

  return key;
};
