import Vue from "vue";
import Vuex from "vuex";
import { SET_MONSTER } from "./mutations";
import { Monster } from "./monster";
import { MONSTER } from "./keys";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [MONSTER]: new Monster()
  },
  getters: {},
  mutations: {
    [SET_MONSTER](state, value) {
      state.monster = value;
    }
  },
  actions: {}
});
