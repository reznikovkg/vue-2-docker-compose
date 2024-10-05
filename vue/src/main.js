import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router';
import { sync } from "vuex-router-sync";
import store from "@/store";

Vue.config.productionTip = false

sync(store, router);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
