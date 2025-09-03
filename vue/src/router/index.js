import Vue from 'vue'
import VueRouter from 'vue-router'
import GameView from '@/views/GameView.vue'
import IntroView from '@/views/IntroView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: IntroView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router