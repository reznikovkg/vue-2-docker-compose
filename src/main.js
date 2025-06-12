import '@/less/style.less'
import Vue from 'vue'
import App from '@/components/App.vue'
import Vuex from 'vuex'
import storeRoot from './store'
import memoryRouterPlugin from "@/memoryRouterPlugin";

Vue.use(Vuex)
Vue.config.productionTip = false

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

const store = new Vuex.Store(storeRoot);

Vue.use(memoryRouterPlugin, {store});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
