import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/HomePage.vue')
const Levels = () => import('../views/LevelsPage.vue')
const Play = () => import('../views/PlayPage.vue')
const Admin = () => import('../views/AdminPage.vue')

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/levels', name: 'levels', component: Levels },
    { path: '/play/:levelId', name: 'play', component: Play, props: true },
    { path: '/admin', name: 'admin', component: Admin },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router