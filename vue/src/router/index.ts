import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import CardsPage from '../components/pages/CardsPage.vue'
import { RouteNames } from './routes'
import CreateCardPage from '@/components/pages/CreateCardPage.vue'
import DetailedCardPage from '@/components/pages/DetailedCardPage.vue'
import EditCardPage from '@/components/pages/EditCardPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/cards',
    name: RouteNames.CARDS,
    component: CardsPage
  },
  {
    path: '/cards/:id',
    name: RouteNames.CARD,
    component: DetailedCardPage 
  },
  {
    path: '/create-card',
    name: RouteNames.CREATE,
    component: CreateCardPage
  },
  {
    path: '/cards/:id/edit',
    name: RouteNames.EDIT,
    component: EditCardPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
