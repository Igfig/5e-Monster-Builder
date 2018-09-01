import _ from "lodash";
import { createKeyTree } from "../../util/store";
import { Monster } from "./classes";
import { MONSTER } from "../keys";

const state = new Monster();
const [monsterKeys, mutations] = createKeyTree(state, MONSTER);

export const keys = { monster: monsterKeys }; // TODO move to separate keys file?

// TODO move this bit to tests
/*const testState = { speed: {} };
mutations[monsterMutationTree.speed.land](testState, "test");
console.log(testState);*/

const getters = {
  speed: state => {
    const speed = { ...state.speed };
    if (_.isNil(speed.land)) {
      speed.land = state.size.speed;
    }
    return speed;
  }
};

const monster = {
  namespaced: true,
  state,
  mutations,
  getters
};
export default monster;
