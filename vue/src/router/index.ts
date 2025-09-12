import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/Home.vue'
import FileExplorer from '../components/pages/Explorer.vue' // Изменили импорт
import { ROUTER_NAMES } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTER_NAMES.HOME,
    component: Home
  },
  {
    path: '/explorer',
    name: ROUTER_NAMES.EXPLORER,
    component: FileExplorer // Используем новое имя
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router