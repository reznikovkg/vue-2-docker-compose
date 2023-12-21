import Vue from "vue";
import App from '@/components/App.vue';
import TopBanner from './components/views/TopBanner.vue'
import NeedHelp from './components/views/NeedHelp.vue'
import CakeOfTheDay from './components/views/CakeOfTheDay.vue'
import AssortementComponent from './components/views/AssortementComponent.vue'
import CakesComponent from './components/views/CakesComponent.vue'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import router from "./router";
import "./assets/main.css";
import { uniRestaurant, uniSearch, uniShoppingBag, uniFacebookF, uniTwitter, uniInstagramAlt, uniFavorite, uniArrowRight, uniArrowLeft, uniSlidersVAlt } from 'vue-unicons/dist/icons'

Unicon.add([uniRestaurant, uniSearch, uniShoppingBag, uniFacebookF, uniTwitter, uniInstagramAlt, uniFavorite, uniArrowRight , uniArrowLeft, uniSlidersVAlt])
Vue.use(Unicon)

Vue.component('app-topbanner', TopBanner);
Vue.component('app-need-help', NeedHelp);
Vue.component('app-cake-of-the-day', CakeOfTheDay);
Vue.component('app-assortement', AssortementComponent);
Vue.component('app-cakes', CakesComponent);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");


