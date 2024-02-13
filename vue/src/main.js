import Vue from 'vue'
import App from '@/components/App.vue'
import router from './router';
import {
  uniUser,
  uniSearch,
  uniArrowRight,
  uniShoppingCart,
  uniStar,
  uniHeart,
  uniUserPlus,
  uniSignin,
  uniAngleRightB,
  uniAngleLeftB,
  uniBalanceScale,
  uniSchedule,
  uniComment,
  uniFacebookF,
  uniTwitter,
  uniGoogle,
  uniInstagram
} from "vue-unicons/dist/icons";
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'

Unicon.add([uniUser, uniSearch, uniFacebookF, uniGoogle, uniInstagram, uniTwitter, uniComment, uniSchedule, uniArrowRight, uniShoppingCart, uniStar, uniHeart, uniUserPlus, uniSignin, uniAngleRightB, uniAngleLeftB, uniBalanceScale])

Vue.use(Unicon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
