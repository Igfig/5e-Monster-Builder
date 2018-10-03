import { Monster } from "./classes";
import { moduleGetters, moduleMutations } from "../../util";

const monster = {
  namespaced: false, // this is key
  state: new Monster(),
  modules: {},
  getters: { monster: moduleGetters },
  mutations: { monster: moduleMutations }
};
export default monster;
