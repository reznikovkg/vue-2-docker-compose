import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteNames } from './routes'
import CatalogPage from '@/components/pages/Catalog.vue'
import ItemPage from '@/components/pages/Item.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.CATALOG,
    component: CatalogPage
  },
  {
    path: '/item/:itemId',  
    name: RouteNames.ITEM,
    component: ItemPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
