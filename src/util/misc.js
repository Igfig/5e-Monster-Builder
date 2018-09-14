import _ from "lodash";

export function diceAverage(num, size) {
  return Math.floor(num * dieAverage(size));
}
export function dieAverage(size) {
  return (1 + size) / 2.0;
}

export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}

export class Ordered {
  constructor(obj, sortFunc) {
    for (const [key, val] of Object.entries(obj)) {
      // always store entries as objects
      const record = typeof val === "object" ? val : { label: val };
      // TODO maybe only store val in the label if it was a string? Integers, say, should be stored as such

      // every entry must have an id
      record.id = record.id || key;

      // these records are effectively constants, shouldn't be edited later

      // add entry to this
      this[key] = Object.freeze(record);
    }

    Object.defineProperty(this, "length", {
      get: () => Object.keys(this).length,
      enumerable: false
    });
    Object.defineProperty(this, "sortFunc", {
      value: sortFunc,
      enumerable: false
    });
  }

  *[Symbol.iterator]() {
    const sorted = Object.values(this).sort(this.sortFunc);
    for (const s of sorted) {
      yield s;
    }
  }
}

const sortDescendingIndicators = ["desc", "d", "descending", -1];

// FIXME not very efficient
// FIXME it actually doesn't seem to work right, I think
// TODO accept strings instead of sublists
export function compare(...keyDirections) {
  return (aVal, bVal) => {
    //debugger;
    for (const kd of keyDirections) {
      const [key, direction] = Array.isArray(kd) ? kd : [kd, 1];
      const mult = _.includes(sortDescendingIndicators, direction) ? -1 : 1;
      if (!aVal.hasOwnProperty(key) || !bVal.hasOwnProperty(key)) {
        throw Error("aaaa" + aVal + key);
      }
      if (aVal[key] === bVal[key]) {
        continue;
      }
      //console.log(aVal, bVal, aVal[key] < bVal[key] * mult);
      return aVal[key] - bVal[key] * mult;
    }
  };
}

//TODO move to tests
/*const x = ordered({ a: 1, b: 2 });
console.log(x.a);

for (const y in x) {
  console.log(y, x[y]);
}*/

export function get(option, property = "id", defaultValue = option) {
  return _.get(option, property, defaultValue);
}
export function getLabel(option, defaultValue = option) {
  return _.get(option, "label", defaultValue);
}

export function min(val, of = null) {
  if (Array.isArray(of) && of.includes(val)) {
    return other => of.includes(val) && of.indexOf(val) <= of.indexOf(other); //XXX maybe we don't need the includes() and fresh index check, but I worry about the list changing later
  }

  // TODO more comparisons

  return other => val <= other;
}
export function max(val, of = null) {
  if (Array.isArray(of) && of.includes(val)) {
    return other => of.includes(other) && of.indexOf(val) >= of.indexOf(other); //XXX maybe we don't need the includes() and fresh index check, but I worry about the list changing later
  }

  // TODO more comparisons

  return other => val >= other;
}

// TODO maybe move these into their own file?

export function propertiesToGetters(obj) {
  return objectFromKeys(obj, undefined, key => state => state[key]);
}
export function propertiesToMutations(obj) {
  return objectFromKeys(obj, undefined, key => (state, newValue) => {
    state[key] = newValue;
  });
}

export function objectFromKeys(obj, keyFunc = k => k, valFunc = k => obj[k]) {
  const properties = Array.isArray(obj) ? obj : Object.keys(obj);
  return properties.reduce((collected, key) => {
    collected[keyFunc(key)] = valFunc(key, obj[key]); // note that by default the second param does nothing
    return collected;
  }, {});
}
