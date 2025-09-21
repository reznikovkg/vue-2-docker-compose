import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const GameView = () => import('../components/GameView.vue')

const routes = [
    { path: '/', name: 'game', component: GameView }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router