import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteNames } from './routes'
import HomePage from '@/components/pages/Home.vue'
import StorePage from '@/components/pages/StorePage.vue'
import ProductPage from '@/components/pages/ProductPage.vue'
import CartPage from '@/components/pages/CartPage.vue'
import CreatePage from '@/components/pages/CreatePage.vue'
import EditPage from '@/components/pages/EditPage.vue'
import SettingsPage from '@/components/pages/SettingsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/store',
    name: RouteNames.STORE,
    component: StorePage
  },
  {
    path: '/product/:id',
    name: RouteNames.PRODUCT,
    component: ProductPage
  },
  {
    path: '/cart',
    name: RouteNames.CART,
    component: CartPage
  },
  {
    path: '/create',
    name: RouteNames.CREATE,
    component: CreatePage
  },
  {
    path: '/edit/:id',
    name: RouteNames.EDIT,
    component: EditPage
  },
  {
    path: '/settings',
    name: RouteNames.SETTINGS,
    component: SettingsPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
