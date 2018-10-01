import _ from "lodash";
import { Monster } from "./classes";

const makeGettersFromClass = (module, moduleGetters) => {
  const getters = {};
  const entries = Object.entries(module.constructor.getters);

  for (const [k, v] of entries) {
    const f = v; // this is weirdly necessary because otherwise it uses the last value v takes, which here is the function 'bar'.
    Object.defineProperty(getters, k, {
      enumerable: true, // this is key
      get: () => f(module, moduleGetters)
    });
  }

  return getters;
};

const state = new Monster();

const monster = {
  namespaced: false, // this is key
  state,
  modules: {},
  getters: { monster: makeGettersFromClass },
  mutations: {
    monster: (monster, payload) => {
      const { value, path } = payload;
      const customMutation = _.get(Monster.mutations, path);

      if (customMutation) {
        customMutation(monster, value);
      } else {
        _.set(monster, path, value);
      }
    }
  }
};
export default monster;
