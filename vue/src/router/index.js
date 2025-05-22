import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/HomePage.vue'
import HeroDetail from '../components/pages/HeroDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/hero/:name', name: 'HeroDetail', component: HeroDetail, props: true  },
  ]
})
