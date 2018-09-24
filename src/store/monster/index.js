import _ from "lodash";
import { Monster } from "./classes";
//import { createStoreModule } from "../../util";
//import { MONSTER } from "../keys";

const makeGettersFromClass = (module, moduleGetters) => {
  console.log("mgfs", monster, moduleGetters);

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

//createStoreModule(Monster, MONSTER);

const monster = {
  namespaced: false, // this is key
  state,
  getters: { monster: makeGettersFromClass },
  mutations: {
    monster: (monster, payload) => {
      const { value, path } = payload;
      const customMutation = _.get(Monster.mutations, path);
      console.log("payload", monster, Monster.mutations, payload, customMutation);

      if (customMutation) {
        customMutation(monster, value);
      } else {
        _.set(monster, path, value);
      }
    },

    poop: (monster, val) => {
      console.log("poop", monster, val);
      return (monster.name = `${val} poop`);
    }
  }
  //mutations: { monster: makeMutationsFromState }
};
export default monster;
