"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByKey = exports.findDuplicate = void 0;
function findDuplicate(arr) {
    return arr.filter((item, index) => arr.indexOf(item) != index);
}
exports.findDuplicate = findDuplicate;
function getByKey(items, key, init) {
    let collection = init || [];
    for (const item of items) {
        if (!item[key])
            continue;
        if (collection.includes(item[key]))
            continue;
        collection.push(item[key]);
    }
    return collection;
}
exports.getByKey = getByKey;
//# sourceMappingURL=array.js.map