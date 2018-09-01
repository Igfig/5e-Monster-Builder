import _ from "lodash";

export function mapVuexMap(vuexMap, ...mutations) {
  return vuexMap(mutations.map(mutation => mutation.toString()));
}

const genericSetter = context => {
  return (state, val) => {
    _.set(state, context, val);
  };
};

// XXX I must admit this is a little finicky. If you're not careful, you'll find yourself dealing with objects when you expected strings.
class KeyTree {
  constructor(...context) {
    Object.defineProperties(this, {
      _name: {
        value: context.join("/"),
        writable: false,
        enumerable: false
      }
    });
  }

  toString() {
    // XXX might do valueOf too?
    return this._name;
  }
}

export function createKeyTree(obj, root, ...context) {
  const tree = new KeyTree(root, ...context);
  const mutations = {};

  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    const newContext = [...context, key];

    // add mutations to the list
    // we don't include getters because every getter is a special case. (If it weren't, we could just look at the state directly.)
    const mutationName = newContext.join("/");
    mutations[mutationName] = genericSetter(newContext);

    if (
      typeof value === "object" &&
      !_.isNil(value) &&
      !Array.isArray(value) && // TODO maybe add special case for adding to array?
      !Object.isFrozen(value) // TODO any more corner cases to avoid?
    ) {
      // if it's an object, go deeper with a new subtree
      const [subTree, subTreeMutations] = createKeyTree(value, root, ...newContext); // XXX unrestricted recursivity could be dangerous, limit this maybe
      tree[key] = subTree;
      Object.assign(mutations, subTreeMutations); // merge in mutations from subtree
    } else {
      // otherwise, add a new leaf to the tree
      tree[key] = new KeyTree(root, ...newContext);
    }
  }

  return [tree, mutations];
}
