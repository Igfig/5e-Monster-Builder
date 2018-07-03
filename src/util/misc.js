export function callIfFunction(func, value, fallback = func) {
  if (!!func && typeof func === "function") {
    return func(value);
  }
  return fallback;
}

function getId(value) {
  return value.toUpperCase().replace(" ", "_");
}

/**
 * add each entry of an array to that array object as a property.
 * This allows for both lookup and iteration in order, but it does mean that the array can't be
 * modified later.
 *
 * @param array an array of objects, each of which must have an "id" property
 */
export function dictify(array) {
  array.forEach(value => {
    if (typeof value === "number") {
      return;
    }
    if (typeof value === "string") {
      const id = getId(value);
      array[id] = value;
      return;
    }

    if (typeof value === "object") {
      if (!value.hasOwnProperty("id")) {
        if (value.hasOwnProperty("label")) {
          value.id = getId(value.label);
        }
      }

      Object.freeze(value); // so it can't get changed by mistake later
      array[value.id] = value;
      return;
    }

    throw new Error(`value ${value} is not a dictifiable type`);
  });

  return Object.freeze(array);
}
/* export function dictify(array) {
  array.forEach((value, key) => {
    let newValue = value;

    if (typeof value === "string") {
      // make an object for that string
      newValue = { id: value.toUpperCase().replace(" ", "_"), label: value };
    }

    // freeze the value so it can't get changed by mistake later
    const finalValue = Object.freeze(newValue);
    array[key] = finalValue;

    array[finalValue.id] = finalValue;
  });

  return Object.freeze(array);
} */

export function get(option, property = "id") {
  if (typeof option === "object") {
    return option[property];
  }
  return option;
}

export function formatBonus(bonus) {
  return bonus < 0 ? bonus.toString() : `+${bonus}`;
}
