"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getLastNDays = exports.getToday = void 0;
const date_fns_1 = require("date-fns");
function getToday() {
    return (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
}
exports.getToday = getToday;
function getLastNDays(n) {
    const currentDate = new Date();
    const startDate = (0, date_fns_1.subDays)(currentDate, 1);
    const endDate = (0, date_fns_1.subDays)(currentDate, n);
    return { startDate, endDate };
}
exports.getLastNDays = getLastNDays;
function formatDate(date) {
    return date ? (0, date_fns_1.format)(date, 'yyyy-MM-dd') : '';
}
exports.formatDate = formatDate;
//# sourceMappingURL=dateUtils.js.map