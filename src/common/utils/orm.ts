export function equal(
  key: string,
  value: string | boolean | number | Date | string[],
) {
  if (typeof value == 'boolean') return `${key} = ${value == true ? 1 : 0}`;
  return `${key} = '${value}'`;
}

export function notEqual(key: string, value: string | number | boolean) {
  return `NOT ${key} = '${value}'`;
}

export function equalMonth(key: string, value?: string) {
  const month = value || new Date().getMonth() + 1;
  return `EXTRACT(MONTH FROM ${key}) = ${month}`;
}

export function equalYear(key: string, value?: string) {
  const year = value || new Date().getFullYear();
  return `EXTRACT(YEAR FROM ${key}) = ${year}`;
}

export function like(key: string, value: string) {
  return `${key} LIKE '%${value}%'`;
}

export function isNull(key: string) {
  return `${key} IS NULL`;
}

export function isNotNull(key: string) {
  return `${key} IS NOT NULL`;
}

export function notIns(key: string, value: string[]) {
  const valueToString = value.map((val) => `'${val}'`).join(', ');
  return `${key} NOT IN (${valueToString})`;
}

export function Ins(key: string, value: string[]) {
  const valueToString = value.map((val) => `'${val}'`).join(', ');
  return `${key} IN (${valueToString})`;
}

export function betweenISOStringDate(key: string, first: Date, second: Date) {
  const startDate = first.toISOString().substr(0, 19).replace('T', ' ');
  const endDate = second.toISOString().substr(0, 19).replace('T', ' ');
  return `${key} BETWEEN '${startDate}' AND '${endDate}'`;
}

export function betweenStringDate(key: string, first: Date, second: Date) {
  return `${key} BETWEEN '${first}' AND '${second}'`;
}

export function moreThanStringDate(key: string, date: Date) {
  return `${key} > '${date}'`;
}

export function lessThanStringDate(key: string, date: Date) {
  return `${key} < '${date}'`;
}

export function moreThanEqualStringDate(key: string, date: Date) {
  return `${key} >= '${date}'`;
}

export function lessThanEqualStringDate(key: string, date: Date) {
  return `${key} <= '${date}'`;
}
