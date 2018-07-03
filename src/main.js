// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vue2Filters from "vue2-filters";
import FragmentPlugin from "vue-fragments";

import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Vue2Filters);
Vue.use(FragmentPlugin);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
