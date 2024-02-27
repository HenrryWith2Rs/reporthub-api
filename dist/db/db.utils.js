"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = void 0;
/* Generate Key utils */
const getBotValue = (bot) => {
    let botValue = '';
    if (bot === 'appointment')
        botValue = 'appt';
    else if (bot === 'billing')
        botValue = 'bill';
    return botValue;
};
const getReportValue = (string) => {
    let stringValue = '';
    if (string === 'detailed')
        stringValue = 'dtld';
    else if (string === 'summary')
        stringValue = 'smmr';
    return stringValue;
};
const getDateValue = (date) => {
    const [year, month, day] = date.split('-');
    return `${year}${month}${day}`;
};
const generateKey = (date, bot, reportType) => {
    const botValue = getBotValue(bot);
    const reportValue = getReportValue(reportType);
    const dateValue = getDateValue(date);
    const key = `${botValue}${reportValue}${dateValue}`;
    return key;
};
exports.generateKey = generateKey;
//# sourceMappingURL=db.utils.js.map