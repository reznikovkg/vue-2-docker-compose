import Vue from 'vue'
import App from '@/components/App.vue'

import Vuex from 'vuex'
import storeRoot from './store'
import router from './router'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(storeRoot)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
