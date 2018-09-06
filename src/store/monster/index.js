import _ from "lodash";
import { createBasicMutations, createKeyTree } from "../../util/store";
import { Monster } from "./classes";
import { MONSTER } from "../keys";

const state = new Monster();

// TODO I really want to fit all three of these into one object if I can
//

const monsterStateKeys = createKeyTree(state, MONSTER);
const monsterGetterKeys = createKeyTree(Monster.getters, MONSTER);
const monsterMutationKeys = _.merge(monsterStateKeys, createKeyTree(Monster.mutations, MONSTER)); // FIXME this is a bit of an overwrite. Declaring a mutator for a higher-level

console.log("sk", monsterStateKeys);
console.log("gk", monsterGetterKeys);
console.log("mk", monsterMutationKeys);

const basicMutations = createBasicMutations(monsterStateKeys, MONSTER);

console.log("bm", basicMutations);

/*for (const g in Monster.getters) {
  monsterStateKeys[g] = createKeyTree();
}*/

//Object.monsterKeys

export const stateKeys = { monster: monsterStateKeys };
export const mutationKeys = { monster: monsterMutationKeys };
export const getterKeys = { monster: monsterGetterKeys };

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
