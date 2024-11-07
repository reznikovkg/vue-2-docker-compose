import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import GamePage from '../components/pages/GamePage.vue'
import {RouteNames} from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/game',
    name: RouteNames.GAME,
    component: GamePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
