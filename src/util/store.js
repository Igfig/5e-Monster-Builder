import _ from "lodash";
import { mapState, mapGetters, mapMutations } from "vuex";

// TODO move these two to another file maybe
function pathToArray(path) {
  return path.split("/");
}
function arrayToPath(arr) {
  return arr.join("/"); // TODO maybe skip any empty elements
}

const genericSetter = context => (state, val) => {
  _.set(state, context, val);
};

// XXX I must admit this is a little finicky. If you're not careful, you'll find yourself dealing with objects when you expected strings.
// technically this is a node in a KeyTree, but whatever the concepts are interchangeable
class KeyTree {
  constructor(...context) {
    Object.defineProperties(this, {
      _name: {
        value: arrayToPath(context),
        writable: false,
        enumerable: false
      },
      _state: {
        // there might be some getters or mutations that don't actually correspond to state objects
        value: false,
        writable: true,
        enumerable: false
      },
      _getter: {
        value: false,
        writable: true,
        enumerable: false
      },
      _mutation: {
        // whether this node has a *custom* mutation. (All nodes have at least a default notation)
        value: false,
        writable: true,
        enumerable: false
      }
    });
  }

  toString() {
    // XXX might do valueOf too?
    return this._name;
  }
}

function createKeyTree(obj, ...context) {
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
}

// We don't create basic getters because every getter is a special case. (If it weren't, we could just look at the state directly.)
function collectBasicMutations(keyTree, root, ...context) {
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
}

function updateFromPathList(obj, tree, property) {
  const keys = Object.keys(obj);

  for (const key of keys) {
    _.setWith(
      tree,
      [...pathToArray(key), property],
      true,
      (objValue, key, parent) => objValue || new KeyTree(parent, key) // TODO comment properly
    );
  }
}

export class Api {
  constructor(store, keyTree) {
    //}

    this.getter.bind(store);
    this.setter.bind(store);

    //createApi(store, keyTree) {
    //const api = new Api();

    //console.log(keyTree);

    //const paths = Object.values(keyTree).map(value => value._name);
    //console.log("paths", paths);

    //const mapped = mapState(paths);
    //console.log("map", mapped);

    this.walk(store, keyTree);

    // /return api;

    //console.log("api", this);
  }

  walk(store, keyTree) {
    this.createProperty(keyTree);

    for (const key in keyTree) {
      this.walk(store, keyTree[key]);

      //const subApi = new Api(store, keyTree[key]);
      //const subApi = this.createApi(store, keyTree[key]);
      //console.log("subapi", subApi);

      //Object.assign(this, subApi);

      //createProperty(api, keyTree[key]);
    }
  }

  createProperty(node) {
    const path = node.toString();
    //console.log(key, keyTree[key], path, mapState([path]));
    const get = this.getter(node, path);
    const set = this.setter(path);

    //const a = this;

    //console.log(key, get, set);

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
}

export function createStoreModule(Class, name) {
  const state = new Class();
  const keyTree = createKeyTree(state, name);

  const basicMutations = collectBasicMutations(keyTree, name); // have to do this before we add the getters and custom mutations

  updateFromPathList(Class.getters, keyTree, "_getter");
  updateFromPathList(Class.mutations, keyTree, "_mutation");

  const getters = Class.getters;
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
}

export function mapVuexMap(vuexMap, ...names) {
  return vuexMap(names.map(name => name.toString())); // toString because they're probably not stored as strings, if they're from a KeyTree or something
}
