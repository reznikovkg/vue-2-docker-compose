import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router';
import Vuex from 'vuex'
import storeRoot from './store'
import { sync } from "vuex-router-sync";
import {uniUser, uniSearch, uniArrowRight, uniShoppingCart, uniStar} from "vue-unicons/dist/icons";
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'

Unicon.add([uniUser, uniSearch, uniArrowRight, uniShoppingCart, uniStar])

Vue.use(Vuex)
Vue.use(Unicon)
Vue.config.productionTip = false


const store = new Vuex.Store(storeRoot)
sync(store, router);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
