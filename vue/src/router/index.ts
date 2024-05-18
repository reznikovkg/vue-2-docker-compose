import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import { RouteNames } from './routes'
import PlantPage from '@/components/pages/PlantPage.vue'
import PlantsPage from '@/components/pages/PlantsPage.vue'
import CreatePlantPage from '@/components/pages/CreatePlantPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/plants',
    name: RouteNames.PLANTS,
    component: PlantsPage
  },
  {
    path: '/plants/:id',
    name: RouteNames.PLANT,
    component: PlantPage
  },
  {
    path: '/create',
    name: RouteNames.CREATE,
    component: CreatePlantPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
