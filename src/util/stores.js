import _ from "lodash";

function buildAccessors(store, name) {
  const module = store.state[name];

  const basicGetter = context => () => _.get(module, context);
  const basicSetter = context => value => store.commit(name, { value, path: context });

  const customGetter = context => () => _.get(store.getters[name], context);
  const conditionalBasicSetter = context =>
    _.has(module, context)
      ? value => {
          store.commit(name, { value, path: context });
        }
      : false;

  const mutationGetter = context => () => value => store.commit(name, { value, path: context });

  return { basicGetter, basicSetter, customGetter, conditionalBasicSetter, mutationGetter };
}

function canGoDeeper(value) {
  return (
    typeof value === "object" &&
    !_.isNil(value) &&
    !Array.isArray(value) && // TODO add special case for adding to array
    !Object.isFrozen(value)
  );
}

function collect(compiled, source, get, set, context = []) {
  const entries = Object.entries(source);

  for (const [key, value] of entries) {
    const newContext = [...context, key];

    if (canGoDeeper(value)) {
      compiled[key] = collect(compiled[key] || {}, value, get, set, newContext);
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
}

function buildMappedStore(store, name) {
  const module = store.state[name];
  const Class = module.constructor;

  const {
    basicGetter,
    basicSetter,
    customGetter,
    conditionalBasicSetter,
    mutationGetter
  } = buildAccessors(store, name);

  const fromState = collect({}, module, basicGetter, basicSetter);
  const fromGetters = collect(fromState, store.getters[name], customGetter, conditionalBasicSetter);
  return collect(fromGetters, Class.mutations, mutationGetter, () => false); // the setter is always false because you should be calling the mutations, not trying to replace them with something else. XXX maybe we should have it throw an error? So you'll know right away if you mess up
}

export function mapStore(name) {
  let mappedStore = undefined;

  return {
    [name]: function() {
      // cache the mapped store
      mappedStore = mappedStore || buildMappedStore(this.$store, name); // 'this' refers to the vue component that called this function

      return mappedStore;
    }
  };
}

export const moduleGetters = (module, moduleGetters) => {
  const getters = {};
  const entries = Object.entries(module.constructor.getters);

  for (const [k, v] of entries) {
    const f = v; // this is weirdly necessary because otherwise it uses the last value v takes, in every case
    Object.defineProperty(getters, k, {
      enumerable: true, // this is key
      get: () => f(module, moduleGetters)
    });
  }

  return getters;
};
export const moduleMutations = (state, payload) => {
  const { value, path } = payload;
  const customMutation = _.get(state.constructor.mutations, path);

  if (customMutation) {
    customMutation(state, value);
  } else {
    _.set(state, path, value);
  }
};
