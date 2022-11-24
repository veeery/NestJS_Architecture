"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachRangeQuery = exports.getRangeYear = exports.getRangeMonth = exports.getRangeToday = void 0;
function getRangeToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const startDate = new Date(`${year}-${month}-${day} 00:00:00:00.00Z`);
    const endDate = new Date(`${year}-${month}-${day} 23:59:59:00.00Z`);
    return { startDate, endDate };
}
exports.getRangeToday = getRangeToday;
function getRangeMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);
    return { date, year, month, startDate, endDate };
}
exports.getRangeMonth = getRangeMonth;
function getRangeYear() {
    const date = new Date();
    const year = date.getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 12, 0, 23, 59, 59);
    return { date, year, startDate, endDate };
}
exports.getRangeYear = getRangeYear;
function attachRangeQuery(query) {
    const { startDate, endDate } = getRangeMonth();
    query.limit = 0;
    query.page = 1;
    if (!query.startDate && !query.endDate) {
        query.startDate = startDate;
        query.endDate = endDate;
    }
    if (query.startDate && !query.endDate) {
        query.endDate = endDate;
    }
    return query;
}
exports.attachRangeQuery = attachRangeQuery;
//# sourceMappingURL=date.js.map