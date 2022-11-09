export function removeProps(object: Object, props: string[]) {
  for (var i = 0; i < props.length; i++) {
    delete object[props[i]];
  }
}

export function findPaths(value: string) {
  return value.split('.');
}

export function findProps(value: any, paths: string[]) {
  let currentValue = value;
  for (const path of paths) currentValue = currentValue[path];
  return currentValue;
}

export function multiGroupBy(collection: any[], keys: any[]) {
  const boxes = {};
  const mapKeyToPath = {};
  for (const key of keys) {
    mapKeyToPath[key] = findPaths(key);
  }

  for (const collect of collection) {
    // Reset pointer box
    let currentBox = boxes;
    for (const key of keys) {
      const paths = mapKeyToPath[key];
      const item = findProps(collect, paths);
      // const itemId = item ? item["id"] : "null";
      let itemId = 'null';
      if (typeof item == 'object' && item != null) {
        itemId = item['id'];
      } else if (item != null) {
        itemId = item;
      }

      // Create object by key
      if (!currentBox[key]) currentBox[key] = {};
      // Create object by itemId
      if (!currentBox[key][itemId]) {
        currentBox[key][itemId] = {};
        if (typeof item == 'object' && item != null) {
          const { id, name, code, date } = item;
          currentBox[key][itemId] = { id, name, code, date };
        } else if (item != null) {
          currentBox[key][itemId] = { [key]: item };
        } else {
          currentBox[key][itemId] = { id: item };
        }
      }

      // Pointer go to deep next box
      currentBox = currentBox[key][itemId];
    }
    // Push current item
    if (!currentBox['items']) currentBox['items'] = [];
    currentBox['items'].push(collect);
  }

  return flattenObject(boxes, keys);
}

export function flattenObject(object: {}, keys: string[]) {
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
