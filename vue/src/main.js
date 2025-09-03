import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import Less from 'less'

Vue.config.productionTip = false
Vue.use(Less)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')