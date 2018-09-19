import { Monster } from "./classes";

const makeGettersFromState = module => {
  const getters = {};
  const entries = Object.entries(module.constructor.getters);

  for (const [k, v] of entries) {
    const f = v; // this is weirdly necessary because otherwise it uses the last value v takes, which here is the function 'bar'.
    Object.defineProperty(getters, k, {
      enumerable: true, // this is key
      get: () => f(module)
    });
  }

  return getters;
};

const monster = {
  namespaced: false, // this is key
  state: new Monster(),
  getters: { monster: makeGettersFromState } //,
  //mutations: { monster: makeMutationsFromState }
};
export default monster;
