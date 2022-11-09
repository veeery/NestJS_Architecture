export function findDuplicate(arr): string[] {
  return arr.filter((item, index) => arr.indexOf(item) != index);
}

export function getByKey<T>(
  items: Array<T>,
  key?: keyof T,
  init?: any[],
): any[] {
  let collection = init || [];
  for (const item of items) {
    if (!item[key]) continue;
    if (collection.includes(item[key])) continue;
    collection.push(item[key]);
  }
  return collection;
}
