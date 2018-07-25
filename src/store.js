import Vue from "vue";
import Vuex from "vuex";
import { SIZES, TYPES, ALIGNMENTS } from "./constants";

Vue.use(Vuex);

class AbilityScore {
  constructor(name, score = 10) {
    this.name = name; // XXX not sure we really need this... it's nice for reading, but it could be a problem if we ever want to, say, swap two scores
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

      abilities: {
        str: new AbilityScore("str"),
        dex: new AbilityScore("dex"),
        con: new AbilityScore("con"),
        int: new AbilityScore("int"),
        wis: new AbilityScore("wis"),
        cha: new AbilityScore("cha")
      }
    }
  },
  getters: {},
  mutations: {},
  actions: {}
});
