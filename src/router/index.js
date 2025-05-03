import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import HeroDetail from '@/views/HeroDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/hero/:name', name: 'HeroDetail', component: HeroDetail, props: true  },
  ]
})
