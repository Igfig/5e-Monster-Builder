import Vue from "vue";
import Vuex from "vuex";
import { SET_MONSTER } from "./mutations";
import { Monster } from "./monster";
import { CURRENT_INFO, MONSTER } from "./keys";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [MONSTER]: new Monster(),
    [CURRENT_INFO]: ""
  },
  getters: {},
  mutations: {
    [SET_MONSTER](state, value) {
      state.monster = value;
    }
  },
  actions: {}
});
