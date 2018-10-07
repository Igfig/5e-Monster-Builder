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
