import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false

if (store._actions['agreement/initialize']) {
  store._actions['agreement/initialize'][0]()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')