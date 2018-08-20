import _ from "lodash";

export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}

// TODO convert this into a class instead
export function ordered(obj = {}, func = ([k, v]) => v) {
  // convert any entries specified as strings or whatever into objects
  //obj = _.mapValues(obj, (v, k) => ({ id: k, ...(typeof v === "object" ? v : { label: v }) }));

  // make sure any sub-objects in obj have an id
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === "object" && !v.hasOwnProperty("id")) {
      v.id = k;
    }
  });

  // TODO replace func with a param that can be something other than a function. If it's not a function, it's the key of the property we use to compare.

  // generate a sort order
  const sortedArray = Object.entries(obj).sort(func);
  obj[Symbol.iterator] = sortedArray.iterator;
  Object.defineProperty(obj, "length", {
    value: sortedArray.length,
    enumerable: false
  });

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
