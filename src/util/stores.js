import _ from "lodash";
// import { mapGetters, mapMutations, mapState } from "vuex";
// import { arrayToPath, pathToArray } from "./paths";

/*export const genericSetter = context => (state, val) => {
  _.set(state, context, val);
};*/

/*const KEY_TREE_PROPERTY_OPTIONS = {
  value: false,
  writable: true,
  enumerable: false
};*/

// XXX I must admit this is a little finicky. If you're not careful, you'll find yourself dealing with objects when you expected strings.
// technically this is a node in a KeyTree, but whatever the concepts are interchangeable
/*class KeyTree {
  constructor(...context) {
    Object.defineProperties(this, {
      _name: {
        ...KEY_TREE_PROPERTY_OPTIONS,
        value: arrayToPath(context),
        writable: false
      },
      _context: {
        // XXX may end up using this instead of _name completely
        ...KEY_TREE_PROPERTY_OPTIONS,
        value: context,
        writable: false
      },
      _state: {
        // there might be some getters or mutations that don't actually correspond to state objects
        ...KEY_TREE_PROPERTY_OPTIONS
      },
      _getter: {
        ...KEY_TREE_PROPERTY_OPTIONS
      },
      _mutation: {
        // whether this node has a *custom* mutation. (All nodes have at least a default notation)
        ...KEY_TREE_PROPERTY_OPTIONS
      }
    });
  }

  toString() {
    // XXX might do valueOf too?
    return this._name;
  }
  size() {
    return Object.keys(this).length;
  }
}*/

/*export function createKeyTree(obj, ...context) {
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

    tree[key]._state = true; // since we're building from the state, every entry must have a state
  }

  return tree;
}*/

// We don't create basic getters because every getter is a special case. (If it weren't, we could just look at the state directly.)
/*export function collectBasicMutations(keyTree, root, ...context) {
  const mutations = {};
  const entries = Object.entries(keyTree);

  for (const [key, subTree] of entries) {
    const newContext = [...context, key];
    const mutationName = newContext.join("/");

    mutations[mutationName] = genericSetter(newContext);

    const subTreeMutations = collectBasicMutations(subTree, root, ...newContext);
    Object.assign(mutations, subTreeMutations); // merge in mutations from subtree
  }

  return mutations;
}*/

/*function updateFromPathList(obj, tree, property) {
  const keys = Object.keys(obj);

  for (const key of keys) {
    _.setWith(
      tree,
      [...pathToArray(key), property],
      true,
      (objValue, key, parent) => objValue || new KeyTree(parent, key) // TODO comment properly
    );
  }
}*/

/*export class Api {
  constructor(store, keyTree) {

    this.getter.bind(store);
    this.setter.bind(store);


    this.walk(store, keyTree);

  }

  walk(store, keyTree) {
    this.createProperty(keyTree);

    for (const key in keyTree) {
      this.walk(store, keyTree[key]);

    }
  }

  createProperty(node) {
    const path = node.toString();
    const get = this.getter(node, path);
    const set = this.setter(path);

    Object.defineProperty(this, node._name, {
      readable: true,
      enumerable: true,
      get,
      set
    });
  }

  setter(path) {
    return mapMutations([path])[path];
  }

  getter(node, path) {
    return (node._getter ? mapGetters([path]) : mapState([path]))[path];
  }
}*/

/*function flatten(obj, context = []) {
  const functions = {};

  for (const [key, value] of Object.entries(obj)) {
    const newContext = [...context, key];
    const path = newContext.join("/");

    if (typeof value === "object") {
      Object.assign(functions, flatten(value, newContext)); // XXX we may need to use _.merge instead?
    } else if (typeof value === "function") {
      // XXX or maybe we should skip this and just always use the value if it's not an object... idk
      functions[path] = value;
    } else {
      throw Error(`tried to flatten() non-function, non-object ${value} at ${path}`);
    }
  }

  return functions;
}*/

/*export function createStoreModule(Class, name) {
  const state = new Class();
  const keyTree = createKeyTree(state, name);

  console.log("keyTree", keyTree);

  const basicMutations = collectBasicMutations(keyTree, name); // have to do this before we add the getters and custom mutations

  console.log("mutations", basicMutations);

  updateFromPathList(Class.getters, keyTree, "_getter");
  updateFromPathList(Class.mutations, keyTree, "_mutation");

  console.log("keyTree2", keyTree);

  //const getters = Class.getters;

  const getters = flatten(Class.getters);

  const mutations = { ...basicMutations, ...Class.mutations }; // basicMutations are the ones automatically created to set the state variables; Class.mutations are added custom.

  //const api = createApi(keyTree); //, Class, state, getters, mutations);

  //console.log("api", api);

  return {
    module: {
      namespaced: true,
      state,
      mutations,
      getters
    },
    keys: { [name]: keyTree } // XXX umm maybe we can do this better too. Unless we're going to merge them or something
    //api // TODO not sure if api is the best name
  };
}*/

/*const foo = (Class, name, context = []) => store => {
  const compiled = {};

  let { state, getters } = store;
  const { mutations } = Class;

  state = state[name];
  getters = getters[name];

  const flattened = !_.isEmpty(context)
    ? {
        state: _.get(state, context),
        getters: _.get(getters, context),
        mutations: _.get(mutations, context)
      }
    : { state, getters, mutations };

  console.log("foostore", store);
  console.log("foobase", { state, getters, mutations });
  console.log("foocur", flattened, context);

  const keys = new Set([
    ...Object.keys(flattened.state || {}),
    ...Object.keys(flattened.getters || {}),
    ...Object.keys(flattened.mutations || {})
  ]);
  //const keys = new Set([...Object.keys(state), ...Object.keys(getters), ...Object.keys(mutations)]); // so we can go through the keys of all three objects at once
  //const keys = new Set([...Object.keys(state)]);
  console.log("keys", keys);

  for (const key of keys) {
    // const hasState = state.hasOwnProperty(key);
    // const hasGetter = getters.hasOwnProperty(key);
    // const hasMutation = mutations.hasOwnProperty(key);

    const newContext = [...context, key];

    const value = state[key]; // FIXME no we should be getting from everything not just the state

    if (
      typeof value === "object" &&
      !_.isNil(value) &&
      !Array.isArray(value) && // TODO maybe add special case for adding to array?
      !Object.isFrozen(value)
    ) {
      console.log("ok", context, key, value, compiled);
      //debugger;
      compiled[key] = foo(Class, name, newContext)(store);
    } else {
      const basicGetter = () => {
        console.log("bget", newContext, store);
        return _.get(store.state[name], newContext);
      };
      const customGetter = () => {
        console.log("cget", newContext, store);
        return _.get(store.getters[name], newContext);
      };
      const mutationGetter = () => {
        console.log("mget", newContext, store);
        return value => store.commit(name, { value, path: newContext });
      };

      //console.log("class", state, Object.getPrototypeOf(state).mutations);
      console.log("class", state, Class.mutations, store, newContext);
      /!*const getter = _.has(Class.mutations, newContext)
       ? mutationGetter
       : _.has(Class.getters, newContext)
       ? customGetter
       : basicGetter;*!/

      const options = { enumerable: true };

      // TODO this might all be a lot easier if we just make the properties configurable and just build them on the same object in the state -> getter -> mutation order. Like we did in createStoreModule
      if (_.has(Class.mutations, newContext)) {
        options.get = mutationGetter;
      } else if (_.has(Class.getters, newContext)) {
        options.get = customGetter;
      } else {
        options.get = basicGetter;
      }

      if (_.has(store.state[name], newContext)) {
        console.log("setter", name, newContext);
        options.set = value => {
          console.log("set", newContext, value);
          store.commit(name, { value, path: newContext });
        };
      }

      Object.defineProperty(compiled, key, options);
    }
  }
  return compiled;
};*/

function canGoDeeper(value) {
  return (
    typeof value === "object" &&
    !_.isNil(value) &&
    !Array.isArray(value) && // TODO add special case for adding to array
    !Object.isFrozen(value)
  );
}

const fwalk = (compiled, source, get, set, context = []) => {
  const entries = Object.entries(source);

  for (const [key, value] of entries) {
    const newContext = [...context, key];

    if (canGoDeeper(value)) {
      compiled[key] = fwalk(compiled[key] || {}, value, get, set, newContext);
    } else {
      const options = {
        configurable: true,
        enumerable: true,
        get: get(newContext)
      };

      const setInContext = set(newContext);
      if (setInContext) {
        options.set = setInContext;
      } // if a setter shouldn't be assigned at all, the set function should return something falsy

      Object.defineProperty(compiled, key, options);
    }
  }

  return compiled;
};

export const mapStore = (Class, name) => store => {
  // XXX If we use it like mapState we might be able to pull from this.$store instead of passing the store in explicitly. And perhaps we can pull the class from an Object.prototype call instead of specifying it explicitly.

  const basicGetter = context => () => _.get(store.state[name], context);
  const basicSetter = context => value => store.commit(name, { value, path: context });

  const customGetter = context => () => _.get(store.getters[name], context);
  const conditionalBasicSetter = context =>
    _.has(store.state[name], context)
      ? value => {
          store.commit(name, { value, path: context });
        }
      : false;

  const mutationGetter = context => () => value => store.commit(name, { value, path: context });

  const fromState = fwalk({}, store.state[name], basicGetter, basicSetter);
  //return fromState;
  //console.log("fromState", { ...fromState });
  const fromGetters = fwalk(fromState, store.getters[name], customGetter, conditionalBasicSetter);
  //console.log("fromGetters", { ...fromGetters });
  const fromMutations = fwalk(fromGetters, Class.mutations, mutationGetter, () => false); // XXX what was this always-false function for again?
  return fromMutations;
};

export function mapVuexMap(vuexMap, ...names) {
  return vuexMap(names.map(name => name.toString())); // toString because they're probably not stored as strings, if they're from a KeyTree or something
}
