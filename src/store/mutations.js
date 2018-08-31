import _ from "lodash";

export const SET_MONSTER = "setMonster";
export const SET_CURRENT_INFO = "setCurrentInfo";
export const SET_MONSTER_LAND_SPEED = "speed/land";

class MutationTree {
  constructor(name) {
    Object.defineProperties(this, {
      _name: {
        value: name,
        writable: false,
        enumerable: false
      },
      _path: {
        value: name.replace("/", "."), // TODO this isn't the greatest approach
        writable: false,
        enumerable: false
      },
      mutation: {
        // TODO may want to separate these and put them in just a big list or object or something
        value: function(state, val) {
          _.set(state, this._path, val);
        },
        writable: false,
        enumerable: false
      }
    });
  }

  valueOf() {
    // XXX this may be unsafe. Maybe use MutationTree objects for every node, instead of string literals?
    return this._name;
  }
}

export function createMutationTree(obj, name) {
  // XXX or maybe we should be passsing in an uninitialized class instead of an obj?
  const tree = new MutationTree(name);

  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    const subName = name ? `${name}/${key}` : key;

    if (
      typeof value === "object" &&
      !_.isNil(value) &&
      !Array.isArray(value) &&
      !Object.isFrozen(value) // TODO any more corner cases to avoid?
    ) {
      //console.log(key, value); // XXX
      tree[key] = createMutationTree(value, subName); // XXX unrestricted recursivity could be dangerous, limit this maybe
    } else {
      tree[key] = subName;
    }
  }

  return tree;
}
