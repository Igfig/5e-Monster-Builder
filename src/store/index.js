import Vue from "vue";
import Vuex from "vuex";
import { SET_MONSTER } from "./mutations";
import { Monster } from "./monster";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monster: new Monster()
  },
  getters: {},
  mutations: {
    [SET_MONSTER](state, value) {
      state.monster = value;
    }
  },
  actions: {}
});
