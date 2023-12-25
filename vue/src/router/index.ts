import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import PartsPage from '../components/pages/Parts.vue'
import ProductPage from '../components/pages/Product.vue'
import NewsPage from '../components/pages/News.vue'
import { RouteNames } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/parts/:id',
    name: RouteNames.PARTS,
    component: PartsPage
  },
  {
    path: '/products/:id',
    name: RouteNames.PRODUCT,
    component: ProductPage
  },
  {
    path: '/news/:id',
    name: RouteNames.NEWS,
    component: NewsPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
