import Vue from "vue";
import Vuex from "vuex";
import { SET_CURRENT_INFO, SET_MONSTER } from "./mutations";
import { Monster } from "./monster";
import { CURRENT_INFO, MONSTER } from "./keys";
import { DEFAULT_INFO_DISPLAY } from "../constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [MONSTER]: new Monster(),
    [CURRENT_INFO]: DEFAULT_INFO_DISPLAY
  },
  getters: {},
  mutations: {
    [SET_MONSTER](state, value) {
      state.monster = value;
    },
    [SET_CURRENT_INFO](state, value) {
      state.currentInfo = value;
    }
  },
  actions: {}
});
