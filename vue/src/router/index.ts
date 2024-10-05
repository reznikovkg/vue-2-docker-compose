import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import { RouteNames } from './routes'
import StartMenuPage from '@/components/pages/StartMenuPage.vue'
import LevelMenuPage from '@/components/pages/LevelMenuPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: "/menu",
    name: RouteNames.START_MENU,
    component: StartMenuPage,
  },
  {
    path: "/levels",
    name: RouteNames.LEVEL_MENU,
    component: LevelMenuPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
