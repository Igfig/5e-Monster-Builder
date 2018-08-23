import Vue from "vue";
import Vuex from "vuex";
import { SET_CURRENT_INFO } from "./mutations";
import { monster } from "./monster";
import { CURRENT_INFO } from "./keys";
import { DEFAULT_INFO_DISPLAY } from "../constants";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    monster
  },
  state: {
    [CURRENT_INFO]: DEFAULT_INFO_DISPLAY
  },
  getters: {},
  mutations: {
    [SET_CURRENT_INFO](state, value) {
      state.currentInfo = value;
    }
  },
  actions: {}
});
