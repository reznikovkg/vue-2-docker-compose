import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { SCALE_FACTOR } from '@/constants'

document.documentElement.style.setProperty('--scale-factor', SCALE_FACTOR)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
