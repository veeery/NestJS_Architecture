"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessThanEqualStringDate = exports.moreThanEqualStringDate = exports.lessThanStringDate = exports.moreThanStringDate = exports.betweenStringDate = exports.betweenISOStringDate = exports.Ins = exports.notIns = exports.isNotNull = exports.isNull = exports.like = exports.equalYear = exports.equalMonth = exports.notEqual = exports.equal = void 0;
function equal(key, value) {
    if (typeof value == 'boolean')
        return `${key} = ${value == true ? 1 : 0}`;
    return `${key} = '${value}'`;
}
exports.equal = equal;
function notEqual(key, value) {
    return `NOT ${key} = '${value}'`;
}
exports.notEqual = notEqual;
function equalMonth(key, value) {
    const month = value || new Date().getMonth() + 1;
    return `EXTRACT(MONTH FROM ${key}) = ${month}`;
}
exports.equalMonth = equalMonth;
function equalYear(key, value) {
    const year = value || new Date().getFullYear();
    return `EXTRACT(YEAR FROM ${key}) = ${year}`;
}
exports.equalYear = equalYear;
function like(key, value) {
    return `${key} LIKE '%${value}%'`;
}
exports.like = like;
function isNull(key) {
    return `${key} IS NULL`;
}
exports.isNull = isNull;
function isNotNull(key) {
    return `${key} IS NOT NULL`;
}
exports.isNotNull = isNotNull;
function notIns(key, value) {
    const valueToString = value.map((val) => `'${val}'`).join(', ');
    return `${key} NOT IN (${valueToString})`;
}
exports.notIns = notIns;
function Ins(key, value) {
    const valueToString = value.map((val) => `'${val}'`).join(', ');
    return `${key} IN (${valueToString})`;
}
exports.Ins = Ins;
function betweenISOStringDate(key, first, second) {
    const startDate = first.toISOString().substr(0, 19).replace('T', ' ');
    const endDate = second.toISOString().substr(0, 19).replace('T', ' ');
    return `${key} BETWEEN '${startDate}' AND '${endDate}'`;
}
exports.betweenISOStringDate = betweenISOStringDate;
function betweenStringDate(key, first, second) {
    return `${key} BETWEEN '${first}' AND '${second}'`;
}
exports.betweenStringDate = betweenStringDate;
function moreThanStringDate(key, date) {
    return `${key} > '${date}'`;
}
exports.moreThanStringDate = moreThanStringDate;
function lessThanStringDate(key, date) {
    return `${key} < '${date}'`;
}
exports.lessThanStringDate = lessThanStringDate;
function moreThanEqualStringDate(key, date) {
    return `${key} >= '${date}'`;
}
exports.moreThanEqualStringDate = moreThanEqualStringDate;
function lessThanEqualStringDate(key, date) {
    return `${key} <= '${date}'`;
}
exports.lessThanEqualStringDate = lessThanEqualStringDate;
//# sourceMappingURL=orm.js.map