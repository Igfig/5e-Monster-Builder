import { Monster } from "../classes/monster";
import { moduleGetters, moduleMutations } from "../util/index";

const monster = {
  namespaced: false, // this is key
  state: new Monster(),
  modules: {},
  getters: { monster: moduleGetters },
  mutations: { monster: moduleMutations }
};
export default monster;
