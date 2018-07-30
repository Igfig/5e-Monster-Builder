import { wordsToConstantName } from "./format";

export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}

export function ordered(obj, func = ([k, v]) => v) {
  const ordered = Object.entries(obj).sort(func);
  obj[Symbol.iterator] = ordered.iterator;
  return obj;
}

// FIXME not very efficient
// TODO accept strings instead of sublists
export function compare(...keyDirections) {
  return ([aKey, a], [bKey, b]) => {
    for (const kd in keyDirections) {
      const [key, direction] = keyDirections[kd];

      const mult = direction === "desc" ? -1 : 1;
      if (a[key] === b[key]) {
        continue;
      }
      return a[key] < b[key] ? -mult : mult;
    }
  };
}

/*export class OrderedDict {
  constructor(obj, func = k => k) {
    this.order = obj;
    console.log(this);
  }

  [Symbol.iterator]() {}
}

new OrderedDict({ a: 1, b: 2 });*/

//TODO move to tests
/*const x = ordered({ a: 1, b: 2 });
console.log(x.a);

for (const y in x) {
  console.log(y, x[y]);
}*/

export function get(option, property = "id") {
  if (typeof option === "object") {
    return option[property];
  }
  return option;
}
