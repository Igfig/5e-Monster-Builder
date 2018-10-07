import _ from "lodash";

export class OrderedDict extends Array {
  constructor(obj, sortFunc) {
    super();

    // At one point I tried letting OrderedDict take an array as a parameter. Problem with that, is that you can't reference any of its properties by key (e.g. ABILITIES.STR) in IntelliJ if you start with an array. So nvm on that, I guess
    const sorted = Object.entries(obj).sort(sortFunc);

    for (const [key, val] of sorted) {
      // always store entries as objects
      const record = typeof val === "object" ? val : { label: val };
      // TODO maybe only store val in the label if it was a string? Integers, say, should be stored as such

      // every entry must have an id
      record.id = record.id || key;

      // add entry to this
      Object.defineProperty(this, key, {
        value: Object.freeze(record), // these records are effectively constants, shouldn't be edited later
        configurable: false,
        writable: false,
        enumerable: false
      });

      this.push(val);
    }
  }

  static SORT_DESCENDING_INDICATORS = ["desc", "d", "descending", -1];

  // FIXME not very efficient
  static compare(...keyDirections) {
    return ([, aVal], [, bVal]) => {
      for (const kd of keyDirections) {
        const [key, direction] = Array.isArray(kd) ? kd : [kd, 1];
        const mult = _.includes(OrderedDict.SORT_DESCENDING_INDICATORS, direction) ? -1 : 1;
        if (!aVal.hasOwnProperty(key) || !bVal.hasOwnProperty(key)) {
          throw Error("key not found " + aVal + key); // TODO better error message
        }
        if (aVal[key] === bVal[key]) {
          continue;
        }
        return aVal[key] - bVal[key] * mult;
      }
    };
  }
}
