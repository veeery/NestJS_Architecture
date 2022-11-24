"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = exports.multiGroupBy = exports.findProps = exports.findPaths = exports.removeProps = void 0;
function removeProps(object, props) {
    for (var i = 0; i < props.length; i++) {
        delete object[props[i]];
    }
}
exports.removeProps = removeProps;
function findPaths(value) {
    return value.split('.');
}
exports.findPaths = findPaths;
function findProps(value, paths) {
    let currentValue = value;
    for (const path of paths)
        currentValue = currentValue[path];
    return currentValue;
}
exports.findProps = findProps;
function multiGroupBy(collection, keys) {
    const boxes = {};
    const mapKeyToPath = {};
    for (const key of keys) {
        mapKeyToPath[key] = findPaths(key);
    }
    for (const collect of collection) {
        let currentBox = boxes;
        for (const key of keys) {
            const paths = mapKeyToPath[key];
            const item = findProps(collect, paths);
            let itemId = 'null';
            if (typeof item == 'object' && item != null) {
                itemId = item['id'];
            }
            else if (item != null) {
                itemId = item;
            }
            if (!currentBox[key])
                currentBox[key] = {};
            if (!currentBox[key][itemId]) {
                currentBox[key][itemId] = {};
                if (typeof item == 'object' && item != null) {
                    const { id, name, code, date } = item;
                    currentBox[key][itemId] = { id, name, code, date };
                }
                else if (item != null) {
                    currentBox[key][itemId] = { [key]: item };
                }
                else {
                    currentBox[key][itemId] = { id: item };
                }
            }
            currentBox = currentBox[key][itemId];
        }
        if (!currentBox['items'])
            currentBox['items'] = [];
        currentBox['items'].push(collect);
    }
    return flattenObject(boxes, keys);
}
exports.multiGroupBy = multiGroupBy;
function flattenObject(object, keys) {
    const [key, ...otherKeys] = keys;
    const flatObject = {};
    flatObject[key] = Object.keys(object[key]).map((objectKey) => {
        return object[key][objectKey];
    });
    if (otherKeys.length != 0) {
        const nextKey = otherKeys[0];
        for (const object of flatObject[key]) {
            object[nextKey] = flattenObject(object, otherKeys)[nextKey];
        }
    }
    return flatObject;
}
exports.flattenObject = flattenObject;
//# sourceMappingURL=object.js.map