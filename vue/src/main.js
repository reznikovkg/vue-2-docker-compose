import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import storeRoot from "./store";
import { sync } from "vuex-router-sync";
import "./main.css";
import Game from "./game.js";

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store(storeRoot);
sync(store, router);

new Vue({
  render: (h) => h(App),
  created: function () {
    Game.init();
  },
  router,
  store,
}).$mount("#app");
