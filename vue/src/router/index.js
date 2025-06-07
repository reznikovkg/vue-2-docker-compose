import Vue from 'vue'
import VueRouter from 'vue-router'
import IntroView from '../views/IntroView.vue'
import GameView from  '../views/GameView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView,
      props: true,
    },
    {
      path: '/game/:level',
      name: 'Game',
      component: GameView,
      props: true,
    },

  ]
})

export default router
