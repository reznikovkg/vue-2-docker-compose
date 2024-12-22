import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import BattlePage from '@/components/pages/BattlePage.vue'
import MenuPage from '@/components/pages/MenuPage.vue'
import { RouteNames } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.MENU,
    component: MenuPage
  },  {
    path: '/Home',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/Battle',
    name: RouteNames.BATTLE,
    component: BattlePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
