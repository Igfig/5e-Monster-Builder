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
class KeyTree {
  constructor(...context) {
    Object.defineProperties(this, {
      /*_root: {
        value: root,
        writable: false,
        enumerable: false
      },*/
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
    if (
      typeof value === "object" &&
      !_.isNil(value) &&
      !Array.isArray(value) && // TODO maybe add special case for adding to array?
      !Object.isFrozen(value) // TODO any more corner cases to avoid?
    ) {
      // if it's an object, go deeper with a new subtree
      const subTree = createKeyTree(value, ...context, key); // XXX unrestricted recursivity could be dangerous, limit this maybe
      tree[key] = subTree;
    } else {
      // otherwise, add a new leaf to the tree
      tree[key] = new KeyTree(...context, key);
    }
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
