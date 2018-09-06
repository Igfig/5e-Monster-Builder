import _ from "lodash";

export function mapVuexMap(vuexMap, ...names) {
  return vuexMap(
    names.map(name => {
      //console.log("name", name);
      //debugger;
      return name.toString();
    })
  ); // toString because they're probably not stored as strings, if they're from a KeyTree or something
}

const genericSetter = context => {
  return (state, val) => {
    _.set(state, context, val);
  };
};

// XXX I must admit this is a little finicky. If you're not careful, you'll find yourself dealing with objects when you expected strings.
// technically this is a node in a KeyTree, but whatever the concepts are interchangeable
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

export function createKeyTree(obj, ...context) {
  const tree = new KeyTree(...context);

  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    tree[key] =
      typeof value === "object" &&
      !_.isNil(value) &&
      !Array.isArray(value) && // TODO maybe add special case for adding to array?
      !Object.isFrozen(value) // TODO any more corner cases to avoid?
        ? createKeyTree(value, ...context, key) // if it's an object, go deeper with a new subtree // XXX unrestricted recursivity could be dangerous if an object contains itself, limit this maybe
        : new KeyTree(...context, key); // otherwise, add a new leaf to the tree
  }

  return tree;
}

// We don't create basic getters because every getter is a special case. (If it weren't, we could just look at the state directly.)

export function createBasicMutations(keyTree, ...context) {
  const mutations = {};
  const entries = Object.entries(keyTree);

  for (const [key, subTree] of entries) {
    const newContext = [...context, key];
    //const mutationName = subTree.toString();
    const mutationName = newContext.join("/");

    mutations[mutationName] = genericSetter(newContext);

    const subTreeMutations = createBasicMutations(subTree, ...newContext);
    Object.assign(mutations, subTreeMutations); // merge in mutations from subtree
  }

  return mutations;
}
