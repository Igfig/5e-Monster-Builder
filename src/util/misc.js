import _ from "lodash";

export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}

export function ordered(obj = {}, func = ([k, v]) => v) {
  const sortedArray = Object.entries(obj).sort(func);
  sortedArray.forEach(([k, v]) => {
    if (typeof v === "object" && !v.hasOwnProperty("ID")) {
      v.ID = k;
    }
  });
  obj[Symbol.iterator] = sortedArray.iterator;
  return obj;
}

const sortDescendingIndicators = ["desc", "d", "descending", -1];

// FIXME not very efficient
// TODO accept strings instead of sublists
export function compare(...keyDirections) {
  return ([aKey, aVal], [bKey, bVal]) => {
    for (const kd in keyDirections) {
      const [key, direction] = Array.isArray(kd) ? keyDirections[kd] : [kd, 1];
      const mult = _.includes(sortDescendingIndicators, direction) ? -1 : 1;
      if (aVal[key] === bVal[key]) {
        continue;
      }
      return aVal[key] < bVal[key] ? -mult : mult;
    }
  };
}

//TODO move to tests
/*const x = ordered({ a: 1, b: 2 });
console.log(x.a);

for (const y in x) {
  console.log(y, x[y]);
}*/

export function get(option, property = "label") {
  if (typeof option === "object") {
    return option[property];
  }
  return option;
}
