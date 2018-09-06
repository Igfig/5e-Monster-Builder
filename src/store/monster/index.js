import { createBasicMutations, createKeyTree } from "../../util/store";
import { Monster } from "./classes";
import { MONSTER } from "../keys";

const state = new Monster();
const monsterKeys = createKeyTree(state, MONSTER);
const basicMutations = createBasicMutations(monsterKeys, MONSTER);

//console.log(monsterKeys, basicMutations);

/*for (const g in Monster.getters) {
  monsterKeys[g] = createKeyTree()
}*/

//Object.monsterKeys

export const keys = { monster: monsterKeys }; // TODO move to separate keys file?

// TODO move this bit to tests
/*const testState = { speed: {} };
basicMutations[monsterMutationTree.speed.land](testState, "test");
console.log(testState);*/

const monster = {
  namespaced: true,
  state,
  mutations: { ...basicMutations, ...Monster.mutations }, // basicMutations are the ones automatically created to set the state variables; Mosnter.mutations are added custom.
  getters: Monster.getters
};
export default monster;
