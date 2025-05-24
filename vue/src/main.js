import Vue from 'vue';
import App from '@/components/App.vue';
import router from './router';
import Vuex from 'vuex';
import storeRoot from './store';
import { sync } from 'vuex-router-sync';
import GameEndModal from '@/components/modals/GameEndModal.vue';
import { ChaosManager, ChaosSettings } from '@/utils/chaos';

Vue.prototype.$chaosManager = ChaosManager;
Vue.prototype.$chaosSettings = ChaosSettings;

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.component('GameEndModal', GameEndModal);

const store = new Vuex.Store(storeRoot);
sync(store, router);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
