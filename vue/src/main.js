import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router';
import Vuex from 'vuex'
import storeRoot from './store'
import { sync } from "vuex-router-sync";
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.config.productionTip = false


const store = new Vuex.Store(storeRoot)
sync(store, router);
Vue.use(ElementUI, { locale })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
