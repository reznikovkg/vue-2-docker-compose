import Vue from 'vue'
import VueRouter from 'vue-router'
import CharPage from '../components/pages/Character.vue'
import { RouteNames } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.CHAR,
    component: CharPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = String(to.name);
  next();
})

export default router
