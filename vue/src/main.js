import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router'
import store from './store' // Импортируем готовый экземпляр
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// Синхронизация с роутером (не создаём новый экземпляр!)
sync(store, router)

new Vue({
  router,
  store, // Используем импортированный экземпляр
  render: h => h(App)
}).$mount('#app')