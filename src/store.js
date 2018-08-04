import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import { SIZES, TYPES, ALIGNMENTS, ABILITIES } from "./constants";
import { SET_MONSTER } from "./mutations";

Vue.use(Vuex);

class AbilityScore {
  constructor(name, score = 10) {
    this.name = name; // XXX not sure we really need this... it's nice for reading, but it could be a problem if we ever want to, say, swap two scores.
    this.score = score;
  }

  get bonus() {
    return Math.floor((this.score - 10) / 2);
    // TODO cache the value if it ends up impacting performance
  }

  // valueOf = () => this.score; // XXX this might be nice but it's also a bit dangerous
}

export default new Vuex.Store({
  state: {
    monster: {
      name: "",
      isProperName: false,

      size: SIZES.MEDIUM,
      type: TYPES.HUMANOID,
      alignment: ALIGNMENTS.UNALIGNED,

      ac: 10,
      hp: 1, // TODO maybe make this a getter/setter that actually updates the hd instead
      hd: 1,

      proficiency: 2, // TODO make dependent on CR

      abilities: _.mapValues(ABILITIES, ability => new AbilityScore(ability.label)),
      saves: [],

      speed: {
        land: SIZES.MEDIUM.speed // TODO this should actually be empty by default, and return the default speed for the current size unless it's set
      }
    }
  },
  getters: {},
  mutations: {
    [SET_MONSTER](state, value) {
      state.monster = value;
    }
  },
  actions: {}
});
