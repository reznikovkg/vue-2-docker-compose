import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/components/App.vue'
import store from './store'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
